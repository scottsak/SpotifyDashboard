import React from 'react';
import useUserQueue from '../../hooks/useUserQueue';
import ListItem from './ListItem';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface Album {
  id: string;
  name: string;
  uri: string;
  [key: string]: any; // Allow any other properties
}

interface CardData {
  added_at: string;
  album: Album;
  [key: string]: any; // Allow any other properties
}

interface QueuedSongsProps {}

const QueuedSongs: React.FC<QueuedSongsProps> = () => {
  const { userQueue } = useUserQueue();
  console.log('scotttest userQueue', userQueue);
  return (
    <>
      <h2 className='pl-4 text-lg font-semibold'>Playing Next: </h2>
      <DragDropContext
        onDragEnd={() => {
          console.log('finish drag');
        }}
      >
        {/* <DragDropContext onDragEnd={this.onDragEnd}> */}
        <Droppable droppableId='droppable'>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              // style={getListStyle(snapshot.isDraggingOver)}
            >
              {userQueue.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      // style={getItemStyle(
                      //   snapshot.isDragging,
                      //   provided.draggableProps.style
                      // )}
                    >
                      <ListItem
                        key={item.id}
                        name={item.album.name}
                        content={item.album.id}
                        artist={item.album.artists}
                        albumCover={item.album.images}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default QueuedSongs;
