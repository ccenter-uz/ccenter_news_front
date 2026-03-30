import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { EditorWysiwyg } from './editor';

export type LangType = 'uz' | 'ru' | 'en';

type MultiLangField = Record<LangType, string>;

export interface ModalData {
  date: string;
  file_link: string;
  img_url: string;
  label: MultiLangField;
  title: MultiLangField;
  text: MultiLangField;
  markdown: MultiLangField;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ModalData) => void;
  data?: ModalData;
  loading?: boolean;
}

const initialFormData: ModalData = {
  date: '',
  file_link: '',
  img_url: '',
  label: { uz: '', ru: '', en: '' },
  title: { uz: '', ru: '', en: '' },
  text: { uz: '', ru: '', en: '' },
  markdown: { uz: '', ru: '', en: '' },
};

export const Modal: React.FC<Props> = ({ isOpen, onClose, onSubmit, data, loading }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<ModalData>(initialFormData);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKey);
    }

    return () => {
      document.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setFormData(data ?? initialFormData);
    }
  }, [data, isOpen]);

  const handleChange = (
    field: keyof Omit<ModalData, 'label' | 'title' | 'text' | 'markdown'>,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMultilangChange = (
    field: keyof Pick<ModalData, 'label' | 'title' | 'text' | 'markdown'>,
    lang: LangType,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [lang]: value,
      },
    }));
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  const handleSubmit = () => {
    if (
      !formData.date ||
      !formData.title.uz.trim() ||
      !formData.label.uz.trim() ||
      !formData.text.uz.trim()
    ) {
      alert('Majburiy maydonlar to‘ldirilishi kerak!');
      return;
    }

    onSubmit(formData);
  };

  if (!isOpen) return null;

  const langs: LangType[] = ['uz', 'ru', 'en'];

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[1000] bg-black/50 flex items-center justify-center px-4"
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-black text-2xl leading-none"
          aria-label="Yopish"
          type="button"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-4">{data ? 'Tahrirlash' : 'Yaratish'} shakli</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="date"
            value={formData.date}
            onChange={(e) => handleChange('date', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <input
            type="text"
            placeholder="File link"
            value={formData.file_link}
            onChange={(e) => handleChange('file_link', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <input
            type="text"
            placeholder="Image URL"
            value={formData.img_url}
            onChange={(e) => handleChange('img_url', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium mb-2">Label</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {langs.map((lang) => (
              <input
                key={`label-${lang}`}
                type="text"
                placeholder={`Label (${lang})`}
                value={formData.label[lang]}
                onChange={(e) => handleMultilangChange('label', lang, e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            ))}
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium mb-2">Title</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {langs.map((lang) => (
              <input
                key={`title-${lang}`}
                type="text"
                placeholder={`Title (${lang})`}
                value={formData.title[lang]}
                onChange={(e) => handleMultilangChange('title', lang, e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            ))}
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium mb-2">Text</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {langs.map((lang) => (
              <textarea
                key={`text-${lang}`}
                placeholder={`Text (${lang})`}
                value={formData.text[lang]}
                onChange={(e) => handleMultilangChange('text', lang, e.target.value)}
                rows={8}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-y focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            ))}
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium mb-2">Markdown</label>
          <div className="grid grid-cols-1 gap-4">
            {langs.map((lang) => (
              <div key={`markdown-${lang}`}>
                <p className="text-sm font-medium text-gray-600 mb-2 uppercase">{lang}</p>
                <EditorWysiwyg
                  value={formData.markdown[lang]}
                  onChange={(value) => handleMultilangChange('markdown', lang, value)}
                  placeholder={`Markdown (${lang})`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100"
          >
            Bekor qilish
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className={classNames(
              'px-4 py-2 text-sm rounded-md text-white',
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700',
            )}
          >
            {loading ? 'Saqlanmoqda...' : data ? 'Yangilash' : 'Yaratish'}
          </button>
        </div>
      </div>
    </div>
  );
};
