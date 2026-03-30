import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnUnderline,
  BtnUndo,
  ContentEditableEvent,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from 'react-simple-wysiwyg';

interface EditorWysiwygProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function EditorWysiwyg({ value, onChange, placeholder }: EditorWysiwygProps) {
  const handleChange = (e: ContentEditableEvent) => {
    onChange(e.target.value);
  };

  return (
    <EditorProvider>
      <div className="w-full border border-gray-300 rounded-md overflow-hidden bg-white">
        <Toolbar>
          <BtnUndo />
          <BtnRedo />
          <Separator />
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <Separator />
          <BtnLink />
        </Toolbar>

        <Editor
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          containerProps={{
            style: {
              minHeight: '180px',
            },
          }}
        />
      </div>
    </EditorProvider>
  );
}
