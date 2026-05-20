import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  BadgeCheck,
  CalendarDays,
  ClosedCaption,
  Copy,
  ExternalLink,
  Heart,
  ImagePlus,
  Loader2,
  PartyPopper,
  RefreshCcw,
  Send,
  Sparkles,
  Trash2,
} from "lucide-react";

import api from "../../config/api";
import { IoIosClose } from "react-icons/io";
import Loading from "../../components/Loading";
import Background from "../../components/birthday/Background";

const BirthdayCreatePage = () => {
  const [form, setForm] = useState({
    name: "",
    date: "",
    sender: "",
    message: "",
  });

  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [isCreated, setIsCreated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);

    const mapped = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...mapped]);

    e.target.value = "";
  };

  const removeImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const resetForm = () => {
    setForm({
      name: "",
      date: "",
      sender: "",
      message: "",
    });

    setImages([]);
    setShareLink("");
    setIsCreated(false);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);

      toast.success("Link copied");
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(import.meta.env.VITE_BACKEND_URL);

    if (!form.name.trim()) {
      toast.error("Enter name");
      return;
    }

    if (!form.date) {
      toast.error("Select date");
      return;
    }

    if (!form.message.trim()) {
      toast.error("Enter message");
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("date", form.date);
      formData.append("sender", form.sender);
      formData.append("message", form.message);

      images.forEach((image) => {
        formData.append("images", image.file, image.file.name);
      });

      const res = await api.post("/public/birthday", formData);
      const data = res.data;
      console.log(data);

      const generatedLink =
        data?.url || `${window.location.origin}/birthday/${data?._id}`;

      setShareLink(generatedLink);

      navigator.clipboard.writeText(generatedLink);

      setIsCreated(true);

      toast.success("Birthday page created");
    } catch (err) {
      console.log(err.response?.data);

      console.log(err.message);

      toast.error(
        err?.response?.data?.message || err?.message || "Failed to create page",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <Background />
      <main className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-10">
        {!isCreated ? (
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl rounded-[2.5rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl"
          >
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.35em] text-pink-200">
                Birthday Creator
              </p>

              <h1 className="mt-4 text-5xl font-bold">Create Birthday Page</h1>

              <p className="mt-4 text-slate-300">
                Add details and generate a shareable birthday experience.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Your Name
                </label>

                <input
                  type="text"
                  name="sender"
                  value={form.sender}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Birthday Date
                </label>

                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Message
                </label>

                <textarea
                  rows={6}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write birthday message..."
                  className="w-full rounded-3xl border border-white/10 bg-white/5 px-5 py-4 outline-none"
                />
              </div>

              {images.length > 0 && (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 ">
                  {images.map((image) => (
                    <div className="relative">
                      <img
                        key={image.id}
                        src={image.preview}
                        alt=""
                        className="h-32 aspect-square w-full rounded-2xl object-cover object-center"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white"
                      >
                        <IoIosClose className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div>
                <label className="mb-4 block text-sm text-slate-300">
                  Photos
                </label>

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-[2rem] border border-dashed border-white/15 bg-white/5 px-6 py-12 text-center">
                  <ImagePlus className="mb-4 h-10 w-10 text-pink-300" />

                  <p className="font-medium">Upload Photos</p>

                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-pink-300 px-6 py-4 font-semibold text-slate-950"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Create Birthday Page
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="w-full max-w-2xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950/80 p-10 shadow-[0_0_120px_rgba(236,72,153,0.15)] backdrop-blur-2xl">
            <div className="text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-amber-300">
                <PartyPopper className="h-12 w-12 text-slate-950" />
              </div>

              <p className="mt-8 text-xs uppercase tracking-[0.4em] text-pink-200">
                Birthday Page Created
              </p>

              <h1 className="mt-4 text-5xl font-bold">It&apos;s Ready 🎉</h1>

              <div className="mt-10 rounded-[2rem] bg-gradient-to-br from-pink-500 via-fuchsia-500 to-amber-300 p-px">
                <div className="rounded-[calc(2rem-1px)] bg-slate-950 p-8">
                  <h2 className="text-4xl font-bold">
                    Happy Birthday,
                    <br />
                    {form.name}
                  </h2>

                  <p className="mt-6 text-lg leading-8 text-slate-200">
                    {form.message}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-slate-300">
                    <CalendarDays className="h-4 w-4 text-pink-300" />
                    <span>{form.date}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5 text-left">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                  Share Link
                </p>

                <a
                  href={shareLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 block break-all text-pink-200"
                >
                  {shareLink}
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={copyLink}
                  className="inline-flex items-center gap-2 rounded-full bg-pink-300 px-6 py-4 font-semibold text-slate-950"
                >
                  <Copy className="h-4 w-4" />
                  Copy Link
                </button>

                <button
                  onClick={resetForm}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-4"
                >
                  <RefreshCcw className="h-4 w-4" />
                  Create Another
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center overflow-hidden bg-black/40 backdrop-blur-xs pointer-events-none">
          <Loading size="h-44 w-44" />
        </div>
      )}
    </div>
  );
};

export default BirthdayCreatePage;
