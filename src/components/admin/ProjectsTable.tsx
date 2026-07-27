import React, { useState } from 'react';
import { useProjects } from '@/context/ProjectsContext';
import { Button } from '@/components/common';
import { Edit2, Trash2, ExternalLink } from 'lucide-react';
import { truncateString, formatDate } from '@/utils/helpers';
import type { Project } from '@/types';

interface ProjectsTableProps {
  projects: Project[];
  onEdit: (projectId: string) => void;
}

export const ProjectsTable: React.FC<ProjectsTableProps> = ({ projects, onEdit }) => {
  const { deleteProject } = useProjects();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteProject(id);
      setConfirmDelete(null);
    } catch (error) {
      console.error('Failed to delete project:', error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#D9D9D9]">Title</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#D9D9D9]">Sector</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#D9D9D9]">Technologies</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#D9D9D9]">Created</th>
            <th className="px-4 py-3 text-right text-sm font-semibold text-[#D9D9D9]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr
              key={project.id}
              className="border-b border-white/10 hover:bg-[#0D0D0D] transition"
            >
              <td className="px-4 py-3 text-sm">
                <div className="flex items-center gap-3">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold text-white">{project.title}</p>
                    <p className="text-gray-400 text-xs mt-1">
                      {truncateString(project.shortDescription, 50)}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-sm">
                <span className="badge">{project.sector}</span>
              </td>
              <td className="px-4 py-3 text-sm">
                <p className="text-gray-300">
                  {project.technologies.slice(0, 2).join(', ')}
                  {project.technologies.length > 2 && ` +${project.technologies.length - 2}`}
                </p>
              </td>
              <td className="px-4 py-3 text-sm text-gray-400">
                {formatDate(project.createdAt)}
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                  {/* View */}
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-[#7CFF00] transition"
                    title="View Live"
                  >
                    <ExternalLink size={18} />
                  </a>

                  {/* Edit */}
                  <button
                    onClick={() => onEdit(project.id)}
                    className="p-2 text-gray-400 hover:text-[#7CFF00] transition"
                    title="Edit"
                  >
                    <Edit2 size={18} />
                  </button>

                  {/* Delete */}
                  {confirmDelete === project.id ? (
                    <div className="flex gap-1">
                      <Button
                        variant="danger"
                        size="sm"
                        isLoading={deletingId === project.id}
                        onClick={() => handleDelete(project.id)}
                      >
                        Confirm
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setConfirmDelete(null)}
                        disabled={deletingId === project.id}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDelete(project.id)}
                      className="p-2 text-gray-400 hover:text-[#EF4444] transition"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
