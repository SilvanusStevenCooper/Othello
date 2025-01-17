"use client";

import { ListWithCards } from "@/types";
import { List } from "@prisma/client";
import ListForm from "./list-form";
import { useEffect, useState } from "react";
import ListItem from "./list-item";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useAction } from "@/hooks/use-action";
import { updateListOrder } from "@/actions/update-list-order";
import { toast } from "sonner";
import { updateCardOrder } from "@/actions/update-card-order";
import { useRouter } from "next/navigation";

interface ListContinerProps {
  boardId: string;
  data: ListWithCards[];
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [remove] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, remove);

  return result;
}

const ListContiner = ({ boardId, data }: ListContinerProps) => {
  const [orderedData, setOrderedData] = useState(data);

  // for changing list order after a user drags and drop
  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onSuccess: () => {
      toast.success("List re-ordered");
    },

    onError: (error) => {
      toast.error(error);
    },
  });

  // for changing cards order after a user drags and drop
  const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
    onSuccess: () => {
      toast.success("Card re-ordered");
    },

    onError: (error) => {
      toast.error(error);
    },
  });

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) return;

    // if dragged and dropped in the same position
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return;
    }

    // user moves a list
    if (type === "list") {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );

      setOrderedData(items);

      // Trigger server action
      executeUpdateListOrder({ items, boardId });
    }

    // user moves a card
    if (type === "card") {
      let newOrderedData = [...orderedData];

      // source and destination list
      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      );
      const destinationList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !destinationList) {
        return;
      }

      // check if cards exists on sourceList
      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      // check if cards exists on destinationList
      if (!destinationList.cards) {
        destinationList.cards = [];
      }

      // moving a card in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );

        reorderedCards.forEach((card, index) => (card.order = index));
        sourceList.cards = reorderedCards;

        setOrderedData(newOrderedData);

        // TODO: Trigger server action
        executeUpdateCardOrder({ items: reorderedCards, boardId });
      } else {
        // moving a card from one list to another

        // remove card from source list
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        // assign new listId to moved card
        movedCard.listId = destination.droppableId;

        // add card to the destination list
        destinationList.cards.splice(destination.index, 0, movedCard);

        // update card order in source list
        sourceList.cards.forEach((card, index) => (card.order = index));

        // update order in destination list
        destinationList.cards.forEach((card, index) => (card.order = index));

        // update state
        setOrderedData(newOrderedData);

        //TODO: Trigger server action
        executeUpdateCardOrder({ items: destinationList.cards, boardId });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" direction="horizontal" type="list">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderedData.map((list, index) => {
              return <ListItem key={list.id} index={index} data={list} />;
            })}

            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ListContiner;
