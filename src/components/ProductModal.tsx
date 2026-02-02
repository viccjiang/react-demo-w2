import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import type {
  ModalType,
  TemplateData,
  ProductModalHandle,
} from "../types/modal";
import { INITIAL_TEMPLATE_DATA } from "../types/modal";

interface ProductModalProps {
  onConfirm: (type: ModalType, data: TemplateData) => void;
}

const ProductModal = forwardRef<ProductModalHandle, ProductModalProps>(
  ({ onConfirm }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState<ModalType>("create");
    const [templateData, setTemplateData] = useState<TemplateData>(
      INITIAL_TEMPLATE_DATA,
    );

    useImperativeHandle(ref, () => ({
      openModal: (type: ModalType, data?: TemplateData) => {
        setModalType(type);
        setTemplateData(data || INITIAL_TEMPLATE_DATA);
        setIsOpen(true);
      },
      closeModal: () => {
        setIsOpen(false);
        setTemplateData(INITIAL_TEMPLATE_DATA);
      },
    }));

    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
      return () => {
        document.body.style.overflow = "unset";
      };
    }, [isOpen]);

    const handleClose = () => {
      setIsOpen(false);
      setTemplateData(INITIAL_TEMPLATE_DATA);
    };

    const handleConfirm = () => {
      onConfirm(modalType, templateData);
      handleClose();
    };

    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      const { name, value, type } = e.target;

      if (type === "checkbox") {
        const checked = (e.target as HTMLInputElement).checked;
        setTemplateData((prev) => ({
          ...prev,
          [name]: checked,
        }));
      } else {
        setTemplateData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    };

    const getModalTitle = () => {
      switch (modalType) {
        case "create":
          return "建立新產品";
        case "edit":
          return "編輯產品";
        case "delete":
          return "刪除產品";
        default:
          return "";
      }
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white shadow-xl">
          {/* Modal Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
            <h3 className="text-xl font-semibold text-slate-900">
              {getModalTitle()}
            </h3>
            <button
              onClick={handleClose}
              className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Modal Body */}
          <div className="px-6 py-4">
            {modalType === "delete" ? (
              <div className="py-4">
                <p className="text-slate-700">
                  確定要刪除{" "}
                  <span className="font-semibold text-slate-900">
                    {templateData.title}
                  </span>{" "}
                  嗎？
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  此操作無法復原，請確認後再進行刪除。
                </p>
              </div>
            ) : (
              <form className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {/* 產品名稱 */}
                  <div>
                    <label
                      htmlFor="title"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      產品名稱 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={templateData.title}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                      placeholder="請輸入產品名稱"
                      required
                    />
                  </div>

                  {/* 分類 */}
                  <div>
                    <label
                      htmlFor="category"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      分類 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="category"
                      name="category"
                      value={templateData.category}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                      placeholder="請輸入分類"
                      required
                    />
                  </div>

                  {/* 單位 */}
                  <div>
                    <label
                      htmlFor="unit"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      單位 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="unit"
                      name="unit"
                      value={templateData.unit}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                      placeholder="個、件、盒"
                    />
                  </div>

                  {/* 原價 */}
                  <div>
                    <label
                      htmlFor="origin_price"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      原價 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="origin_price"
                      name="origin_price"
                      value={templateData.origin_price}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                      placeholder="請輸入原價"
                      required
                      min={0}
                    />
                  </div>

                  {/* 售價 */}
                  <div>
                    <label
                      htmlFor="price"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      售價 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={templateData.price}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                      placeholder="請輸入售價"
                      required
                      min={0}
                    />
                  </div>
                </div>

                {/* 圖片管理區域 */}
                <div className="grid gap-4 md:grid-cols-3">
                  {/* 主圖 */}
                  <div className="md:col-span-1">
                    <div className="mb-3">
                      <label
                        htmlFor="imageUrl"
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        主要圖片網址
                      </label>
                      <input
                        type="url"
                        id="imageUrl"
                        name="imageUrl"
                        value={templateData.imageUrl}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                        placeholder="請輸入圖片連結"
                      />
                    </div>
                    {templateData.imageUrl && (
                      <img
                        src={templateData.imageUrl}
                        alt="主圖"
                        className="w-full rounded-md border border-slate-200 object-cover"
                      />
                    )}
                  </div>

                  {/* 副圖管理 */}
                  <div className="md:col-span-2">
                    <div className="mb-3">
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        副圖片網址
                      </label>
                      <div className="space-y-3">
                        {templateData.imagesUrl.map((url, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex gap-2">
                              <input
                                type="url"
                                value={url}
                                onChange={(e) => {
                                  const newImages = [...templateData.imagesUrl];
                                  newImages[index] = e.target.value;
                                  setTemplateData((prev) => ({
                                    ...prev,
                                    imagesUrl: newImages,
                                  }));
                                }}
                                className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                                placeholder={`圖片網址 ${index + 1}`}
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const newImages =
                                    templateData.imagesUrl.filter(
                                      (_, i) => i !== index,
                                    );
                                  setTemplateData((prev) => ({
                                    ...prev,
                                    imagesUrl: newImages,
                                  }));
                                }}
                                className="rounded-md border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                              >
                                刪除
                              </button>
                            </div>
                            {url && (
                              <img
                                src={url}
                                alt={`副圖 ${index + 1}`}
                                className="h-24 w-auto rounded-md border border-slate-200 object-cover"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setTemplateData((prev) => ({
                            ...prev,
                            imagesUrl: [...prev.imagesUrl, ""],
                          }));
                        }}
                        className="mt-3 w-full rounded-md border border-blue-300 bg-white px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
                      >
                        新增圖片
                      </button>
                    </div>
                  </div>
                </div>

                {/* 產品描述 */}
                <div>
                  <label
                    htmlFor="description"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    產品描述
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={templateData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                    placeholder="請輸入產品描述"
                  />
                </div>

                {/* 產品說明 */}
                <div>
                  <label
                    htmlFor="content"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    產品說明
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={templateData.content}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                    placeholder="請輸入產品說明"
                  />
                </div>

                {/* 是否啟用 */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_enabled"
                    name="is_enabled"
                    checked={templateData.is_enabled}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                  <label
                    htmlFor="is_enabled"
                    className="ml-2 text-sm font-medium text-slate-700"
                  >
                    是否啟用
                  </label>
                </div>
              </form>
            )}
          </div>

          {/* Modal Footer */}
          <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-slate-200 bg-white px-6 py-4">
            <button
              onClick={handleClose}
              className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
            >
              取消
            </button>
            <button
              onClick={handleConfirm}
              className={`rounded-md px-4 py-2 text-sm font-semibold text-white shadow-sm ${
                modalType === "delete"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {modalType === "delete" ? "確認刪除" : "確認"}
            </button>
          </div>
        </div>
      </div>
    );
  },
);

ProductModal.displayName = "ProductModal";

export default ProductModal;
