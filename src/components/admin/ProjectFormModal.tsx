import React, { useState, useEffect } from 'react';
import { useProjects } from '@/context/ProjectsContext';
import { Button, Input, Textarea } from '@/components/common';
import { PORTFOLIO_SECTORS } from '@/constants/config';
import { X, Upload, Plus, Loader2, Image as ImageIcon, Sparkles } from 'lucide-react';
import type { ProjectFormData } from '@/types';

interface ProjectFormModalProps {
  editingProjectId: string | null;
  onClose: () => void;
}

export const ProjectFormModal: React.FC<ProjectFormModalProps> = ({
  editingProjectId,
  onClose,
}) => {
  const { projects, addProject, updateProject } = useProjects();
  const [submitting, setSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    shortDescription: '',
    sector: PORTFOLIO_SECTORS[1]?.slug || 'ecommerce',
    liveLink: '',
    codeLink: '',
    technologies: [],
  });
  const [techInput, setTechInput] = useState('');
  const [errors, setErrors] = useState<Partial<ProjectFormData>>({});

  useEffect(() => {
    if (editingProjectId) {
      const project = projects.find((p) => p.id === editingProjectId);
      if (project) {
        setFormData({
          title: project.title,
          description: project.description,
          shortDescription: project.shortDescription,
          sector: project.sector,
          liveLink: project.liveLink,
          codeLink: project.codeLink || '',
          technologies: project.technologies,
        });
        setImagePreview(project.imageUrl);
      }
    }
  }, [editingProjectId, projects]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ProjectFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview('');
    setFormData((prev) => ({ ...prev, image: undefined }));
  };

  const handleAddTechnology = () => {
    const trimmed = techInput.trim();
    if (trimmed && !formData.technologies.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, trimmed],
      }));
      setTechInput('');
      if (errors.technologies) setErrors((prev) => ({ ...prev, technologies: undefined }));
    }
  };

  const handleRemoveTechnology = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ProjectFormData> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.shortDescription.trim()) newErrors.shortDescription = 'Short description is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.liveLink.trim()) newErrors.liveLink = 'Live link is required';
    if (formData.technologies.length === 0) newErrors.technologies = ['Add at least one technology'];
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      if (editingProjectId) {
        await updateProject(editingProjectId, formData);
      } else {
        await addProject(formData);
      }
      onClose();
    } catch (error) {
      console.error('Failed to save project:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="w-full max-w-3xl my-8 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 shadow-2xl shadow-black/50 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-[#7CFF00]/5 to-[#A6FF00]/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7CFF00] to-[#39FF14] flex items-center justify-center shadow-lg shadow-[#7CFF00]/30">
              <Sparkles size={18} className="text-black" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {editingProjectId ? 'Edit Project' : 'Add New Project'}
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {editingProjectId ? 'Update project details' : 'Fill in the details to add a new project'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={submitting}
            className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Image Upload */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
              Project Image
            </label>
            {imagePreview ? (
              <div className="relative group rounded-2xl overflow-hidden border border-white/10">
                <div className="aspect-video bg-[#0D0D0D]">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <label className="cursor-pointer px-4 py-2 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md text-white font-medium text-sm hover:bg-white/20 transition-all flex items-center gap-2">
                    <Upload size={16} />
                    Change Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      disabled={submitting}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    disabled={submitting}
                    className="px-4 py-2 rounded-xl bg-red-500/20 border border-red-500/30 backdrop-blur-md text-red-200 font-medium text-sm hover:bg-red-500/30 transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    <X size={16} />
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-48 rounded-2xl border-2 border-dashed border-white/10 hover:border-[#7CFF00]/50 cursor-pointer transition-all bg-white/[0.02] hover:bg-[#7CFF00]/5 group">
                <div className="w-14 h-14 rounded-2xl bg-[#7CFF00]/10 border border-[#7CFF00]/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <ImageIcon size={24} className="text-[#7CFF00]" />
                </div>
                <p className="text-white font-semibold mb-1">Click to upload image</p>
                <p className="text-gray-500 text-xs">PNG, JPG, WebP (max 5MB)</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={submitting}
                />
              </label>
            )}
          </div>

          {/* Title */}
          <Input
            label="Project Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Amazing E-commerce Platform"
            error={errors.title}
            disabled={submitting}
            required
          />

          {/* Two-column: short desc + sector */}
          <div className="grid md:grid-cols-2 gap-4">
            <Textarea
              label="Short Description"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              placeholder="One-line project summary"
              rows={2}
              error={errors.shortDescription}
              disabled={submitting}
              required
            />

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-200">
                Sector <span className="text-red-400">*</span>
              </label>
              <select
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                className="input-field"
                disabled={submitting}
              >
                {PORTFOLIO_SECTORS.filter(s => s.slug !== 'all').map((sector) => (
                  <option key={sector.id} value={sector.slug} className="bg-[#000000]">
                    {sector.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Full Description */}
          <Textarea
            label="Full Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Detailed description of the project, features, and your role..."
            rows={4}
            error={errors.description}
            disabled={submitting}
            required
          />

          {/* Two-column: Live Link + Code Link */}
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Live Project Link"
              name="liveLink"
              type="url"
              value={formData.liveLink}
              onChange={handleChange}
              placeholder="https://example.com"
              error={errors.liveLink}
              disabled={submitting}
              required
            />
            <Input
              label="Code Repository (Optional)"
              name="codeLink"
              type="url"
              value={formData.codeLink}
              onChange={handleChange}
              placeholder="https://github.com/user/repo"
              disabled={submitting}
            />
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-200">
              Technologies <span className="text-red-400">*</span>
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTechnology();
                  }
                }}
                placeholder="Type and press Enter (e.g. React, TypeScript)"
                className="input-field flex-1"
                disabled={submitting}
              />
              <Button
                type="button"
                variant="secondary"
                onClick={handleAddTechnology}
                disabled={submitting || !techInput.trim()}
              >
                <Plus size={18} />
                Add
              </Button>
            </div>
            {formData.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-[#7CFF00]/10 text-[#7CFF00] border border-[#7CFF00]/20 hover:bg-red-500/10 hover:text-red-300 hover:border-red-500/30 transition-all cursor-pointer"
                    onClick={() => handleRemoveTechnology(tech)}
                  >
                    {tech}
                    <X size={14} className="group-hover:rotate-90 transition-transform" />
                  </span>
                ))}
              </div>
            )}
            {errors.technologies && (
              <p className="text-red-400 text-sm mt-2">{errors.technologies}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-6 border-t border-white/10">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={submitting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={submitting}
              className="flex-1 group"
            >
              {submitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  <span>{editingProjectId ? 'Update Project' : 'Add Project'}</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
