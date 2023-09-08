import React, { useState } from "react";
import "./index.css";

interface IEditableTextProps {
  text: string;
  id: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EditableText = ({ text, handleChange, id }: IEditableTextProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <div onDoubleClick={handleDoubleClick}>
      {isEditing ? (
        <input
          id={id}
          autoFocus
          className="EditableText_input"
          type="text"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      ) : (
        <span>{text}</span>
      )}
    </div>
  );
};
