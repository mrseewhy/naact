import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const modules = {
    toolbar: {
        container: [
            [{ font: [] }, { header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image', 'video'],
            ['clean'],
        ],
    },
};

const formats = ['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'indent', 'link', 'image', 'video', 'code'];

type RichTextEditorProps = {
    value: string;
    onChange: (value: string) => void;
};

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
    return <ReactQuill theme="snow" value={value} onChange={onChange} modules={modules} formats={formats} className="h-40" />;
}
