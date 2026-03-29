import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { X } from "lucide-react";
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

    const inputClass =
      "w-full rounded-xl border border-white/10 bg-dark-950 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-neon-blue/50";

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
        <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/5 bg-dark-800 shadow-2xl">
          {/* Modal Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/5 bg-dark-800 px-6 py-4">
            <h3 className="font-heading text-lg font-bold text-white">
              {getModalTitle()}
            </h3>
            <button
              onClick={handleClose}
              className="rounded-lg p-1.5 text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="px-6 py-5">
            {modalType === "delete" ? (
              <div className="py-4">
                <p className="text-slate-300">
                  確定要刪除{" "}
                  <span className="font-semibold text-white">
                    {templateData.title}
                  </span>{" "}
                  嗎？
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  此操作無法復原，請確認後再進行刪除。
                </p>
              </div>
            ) : (
              <form className="space-y-5">
                <div className="grid gap-4 md:grid-cols-2">
                  {/* 產品名稱 */}
                  <div>
                    <label
                      htmlFor="title"
                      className="mb-2 block text-sm font-medium text-slate-300"
                    >
                      產品名稱 <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={templateData.title}
                      onChange={handleInputChange}
                      className={inputClass}
                      placeholder="請輸入產品名稱"
                      required
                    />
                  </div>

                  {/* 分類 */}
                  <div>
                    <label
                      htmlFor="category"
                      className="mb-2 block text-sm font-medium text-slate-300"
                    >
                      分類 <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="category"
                      name="category"
                      value={templateData.category}
                      onChange={handleInputChange}
                      className={inputClass}
                      placeholder="請輸入分類"
                      required
                    />
                  </div>

                  {/* 單位 */}
                  <div>
                    <label
                      htmlFor="unit"
                      className="mb-2 block text-sm font-medium text-slate-300"
                    >
                      單位 <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="unit"
                      name="unit"
                      value={templateData.unit}
                      onChange={handleInputChange}
                      className={inputClass}
                      placeholder="個、件、盒"
                    />
                  </div>

                  {/* 原價 */}
                  <div>
                    <label
                      htmlFor="origin_price"
                      className="mb-2 block text-sm font-medium text-slate-300"
                    >
                      原價 <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="number"
                      id="origin_price"
                      name="origin_price"
                      value={templateData.origin_price}
                      onChange={handleInputChange}
                      className={inputClass}
                      placeholder="請輸入原價"
                      required
                      min={0}
                    />
                  </div>

                  {/* 售價 */}
                  <div>
                    <label
                      htmlFor="price"
                      className="mb-2 block text-sm font-medium text-slate-300"
                    >
                      售價 <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={templateData.price}
                      onChange={handleInputChange}
                      className={inputClass}
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
                        className="mb-2 block text-sm font-medium text-slate-300"
                      >
                        主要圖片網址
                      </label>
                      <input
                        type="url"
                        id="imageUrl"
                        name="imageUrl"
                        value={templateData.imageUrl}
                        onChange={handleInputChange}
                        className={inputClass}
                        placeholder="請輸入圖片連結"
                      />
                    </div>
                    {templateData.imageUrl && (
                      <img
                        src={templateData.imageUrl}
                        alt="主圖"
                        className="w-full rounded-xl border border-white/10 object-cover"
                      />
                    )}
                  </div>

                  {/* 副圖管理 */}
                  <div className="md:col-span-2">
                    <div className="mb-3">
                      <label className="mb-2 block text-sm font-medium text-slate-300">
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
                                className={`flex-1 ${inputClass}`}
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
                                className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-400 transition-colors hover:border-red-500/40 hover:bg-red-500/20"
                              >
                                刪除
                              </button>
                            </div>
                            {url && (
                              <img
                                src={url}
                                alt={`副圖 ${index + 1}`}
                                className="h-24 w-auto rounded-xl border border-white/10 object-cover"
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
                        className="mt-3 w-full rounded-xl border border-neon-blue/20 bg-neon-blue/10 px-4 py-2 text-sm font-medium text-neon-blue transition-colors hover:border-neon-blue/40 hover:bg-neon-blue/20"
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
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    產品描述
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={templateData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className={inputClass}
                    placeholder="請輸入產品描述"
                  />
                </div>

                {/* 產品說明 */}
                <div>
                  <label
                    htmlFor="content"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    產品說明
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={templateData.content}
                    onChange={handleInputChange}
                    rows={4}
                    className={inputClass}
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
                    className="h-4 w-4 rounded border-white/20 bg-dark-950 text-neon-blue focus:ring-2 focus:ring-neon-blue/20"
                  />
                  <label
                    htmlFor="is_enabled"
                    className="ml-2 text-sm font-medium text-slate-300"
                  >
                    是否啟用
                  </label>
                </div>
              </form>
            )}
          </div>

          {/* Modal Footer */}
          <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-white/5 bg-dark-800 px-6 py-4">
            <button
              onClick={handleClose}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-white/20 hover:text-white"
            >
              取消
            </button>
            <button
              onClick={handleConfirm}
              className={`rounded-xl px-4 py-2 text-sm font-bold text-white transition-all ${
                modalType === "delete"
                  ? "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)]"
                  : "bg-gradient-to-r from-neon-blue to-neon-purple shadow-[0_0_15px_rgba(0,212,255,0.3)] hover:shadow-[0_0_25px_rgba(0,212,255,0.5)]"
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
