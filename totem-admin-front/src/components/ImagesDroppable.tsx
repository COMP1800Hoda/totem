import React, {useRef} from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {
  FileInputContainer,
  FullWidthLabel,
  Icon,
  Input,
  PreviewContainer,
  PreviewRemoveButton
} from "../pages/file-upload/fileUpload_style.ts";
import DraggingIcon from "../assets/draggingdot.svg";
import {hasDuplicatedFile} from "../utils/hasDuplicatedFile";

export interface FileData {
  file: File | null;
  name: string;
  size: string;
  url: string;
}

interface ImagesDroppableProps {
  files: FileData[];
  setFiles: React.Dispatch<React.SetStateAction<FileData[]>>;
}

export const ImagesDroppable = ({files, setFiles}: ImagesDroppableProps) => {
  const contentInputRef = useRef<HTMLInputElement | null>(null);
  // Handle drag and drop effect
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Prevent default behavior (prevent file from being opened)
    event.currentTarget.classList.add('drag-over');
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    // Optional: Add visual cues or classes
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.currentTarget.classList.remove('drag-over'); // Remove the visual cue on leaving drag area
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.classList.remove('drag-over');

    const files = event.dataTransfer.files;
    handleFileChange(files); // Pass the FileList directly
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      handleFileChange(event.target.files);
    }
    // Reset the value of the input to allow for re-upload of the same file if necessary
    event.target.value = '';
  };


  const handleFileChange = (newFiles: FileList) => {
    console.log("Selecting files");

    if (newFiles.length > 0) {
      const filesArray = Array.from(newFiles);

      // check file format
      const validImages = filesArray.filter(file => file.type.startsWith("image/"));
      if (validImages.length !== filesArray.length) {
        alert("Only image files are allowed.");
        return;
      }

      // check file name duplication
      if (hasDuplicatedFile([...filesArray, ...files])) {
        return;
      }

      const updatedFilesData = filesArray.map((file) => ({
        file: file,
        name: file.name,
        size: `${(file.size / 1024).toFixed(2)}kb`,
        url: URL.createObjectURL(file),
      }));

      setFiles((prevFiles) => [...prevFiles, ...updatedFilesData]);
    }
  };


  const handleRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };
  const onDragEnd = (result: { destination: any; source: any; }) => {
    const {destination, source} = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newFiles = Array.from(files);
    const [moved] = newFiles.splice(source.index, 1);
    newFiles.splice(destination.index, 0, moved);

    setFiles(newFiles);
  };


  return (
    <>
      <FullWidthLabel htmlFor="file-upload">
        <FileInputContainer
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        >
          <Input
            ref={contentInputRef}
            id="file-upload"
            type="file"
            onChange={onInputChange}
            style={{display: "none"}}
            accept="image/*"
            multiple
            required
          />
          <Icon className="fas fa-cloud-upload-alt"/>
          <span style={{fontSize: "16px"}}>Drag and drop images to upload, or click to browse</span>
        </FileInputContainer>
      </FullWidthLabel>
      <DragDropContext onDragEnd={onDragEnd}>
        {files.length > 0 ? (
          <Droppable
            droppableId="filesList"
            isDropDisabled={false}
            isCombineEnabled={false}
            ignoreContainerClipping={false}
          >
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{display: "flex", flexDirection: "column"}}
              >
                {files.map((file, index: number) => (
                  <Draggable key={file.name} draggableId={file.name} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <PreviewContainer>
                          <div style={{display: "flex", alignItems: "center"}}>
                            <img
                              src={DraggingIcon} alt="Dragging Icon"
                              style={{width: "24px", height: "24px", marginRight: 10}}/>
                            <span>{file.name}</span>
                          </div>
                          <div style={{display: "flex", alignItems: "center"}}>
                                                            <span style={{fontSize: "16px", marginRight: "10px"}}>
                                                                {file.size}{' '}
                                                            </span>
                            <PreviewRemoveButton
                              onClick={() => handleRemove(index)}
                            >
                              <i className="fa-solid fa-xmark"></i>
                            </PreviewRemoveButton>
                          </div>
                        </PreviewContainer>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ) : (
          <div style={{padding: 15, textAlign: "center", fontSize: "14px", marginBottom: 10}}>
            No images uploaded or selected. Please upload some images.
          </div>
        )}
      </DragDropContext>
    </>
  )
}