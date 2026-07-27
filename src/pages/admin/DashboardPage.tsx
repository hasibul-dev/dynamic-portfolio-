import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useProjects } from '@/context/ProjectsContext';
import { Button } from '@/components/common';
import { ProjectFormModal } from '@/components/admin/ProjectFormModal';
import {
  Plus, LogOut, LayoutDashboard, FolderKanban, Layers,
  Clock, Search, Edit3, Trash2, ExternalLink, Eye,
  Home, Sparkles, X, AlertTriangle, Loader2, Filter
} from 'lucide-react';
import { PORTFOLIO_SECTORS } from '@/constants/config';
import type { Project } from '@/types';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { projects, loading, deleteProject } = useProjects();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSector, setFilterSector] = useState('all');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  React.useEffect(() => {
    if (!user) navigate('/admin/login');
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setIsFormOpen(true);
  };

  const handleEditProject = (projectId: string) => {
    setEditingProject(projectId);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProject(null);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteProject(id);
      setDeleteConfirmId(null);
    } catch (error) {
      console.error('Failed to delete project:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const uniqueSectors = useMemo(() => {
    const set = new Set(projects.map(p => p.sector));
    return set.size;
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch = searchQuery === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesSector = filterSector === 'all' || p.sector === filterSector;
      return matchesSearch && matchesSector;
    });
  }, [projects, searchQuery, filterSector]);

  if (!user) return null;

  const stats = [
    {
      label: 'Total Projects',
      value: projects.length,
      icon: FolderKanban,
      gradient: 'from-[#7CFF00] to-[#39FF14]',
      bgGradient: 'from-[#7CFF00]/10 to-[#39FF14]/5',
      shadowColor: 'shadow-[#7CFF00]/20',
    },
    {
      label: 'Categories',
      value: uniqueSectors,
      icon: Layers,
      gradient: 'from-[#76FF03] to-[#A6FF00]',
      bgGradient: 'from-[#76FF03]/10 to-[#A6FF00]/5',
      shadowColor: 'shadow-[#76FF03]/20',
    },
    {
      label: 'Last Update',
      value: projects[0]
        ? new Date(projects[0].updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        : '—',
      icon: Clock,
      gradient: 'from-[#7CFF00] to-[#A6FF00]',
      bgGradient: 'from-[#7CFF00]/10 to-[#A6FF00]/5',
      shadowColor: 'shadow-[#7CFF00]/20',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#0D0D0D] to-[#000000]">
      {/* Decorative background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#7CFF00]/5 rounded-full blur-[150px]" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-[#A6FF00]/5 rounded-full blur-[150px]" />
      </div>

      {/* Top Navbar */}
      <nav className="sticky top-0 z-30 glass border-b border-white/5 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7CFF00] to-[#39FF14] flex items-center justify-center shadow-lg shadow-[#7CFF00]/30">
              <Sparkles size={20} className="text-black" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Admin Panel
              </h1>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all"
            >
              <Home size={16} />
              <span>View Site</span>
            </button>
            <Button variant="secondary" size="sm" onClick={handleLogout}>
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-10">
        {/* Page Title */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-[#7CFF00] text-sm font-semibold mb-2">
            <LayoutDashboard size={16} />
            <span>Dashboard Overview</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Manage Your <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-gray-400 mt-2">
            Add, edit, and organize your projects to showcase your best work.
          </p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {stats.map(({ label, value, icon: Icon, gradient, bgGradient, shadowColor }) => (
            <div
              key={label}
              className={`group relative p-6 rounded-2xl bg-gradient-to-br ${bgGradient} border border-white/10 hover:border-[#7CFF00]/30 transition-all duration-500 hover:-translate-y-1 shadow-lg ${shadowColor} overflow-hidden`}
            >
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br opacity-10 blur-2xl group-hover:opacity-20 transition-opacity" />
              <div className="flex items-start justify-between relative z-10">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">{label}</p>
                  <p className="text-4xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {value}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} p-0.5 shadow-lg`}>
                  <div className="w-full h-full rounded-xl bg-[#000000]/80 flex items-center justify-center">
                    <Icon size={20} className="text-black" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Projects Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Projects
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
              {filterSector !== 'all' && ` in ${PORTFOLIO_SECTORS.find(s => s.slug === filterSector)?.name}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>

          <Button variant="primary" size="lg" onClick={handleAddProject} className="group">
            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            <span>Add New Project</span>
          </Button>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search by title, description, or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-[#7CFF00]/50 focus:outline-none focus:ring-2 focus:ring-[#7CFF00]/20 hover:border-white/20 transition-all backdrop-blur-xl text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="relative">
            <Filter size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            <select
              value={filterSector}
              onChange={(e) => setFilterSector(e.target.value)}
              className="appearance-none pl-11 pr-10 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#7CFF00]/50 focus:outline-none focus:ring-2 focus:ring-[#7CFF00]/20 hover:border-white/20 transition-all backdrop-blur-xl text-sm font-medium cursor-pointer"
            >
              <option value="all" className="bg-[#000000]">All Categories</option>
              {PORTFOLIO_SECTORS.filter(s => s.slug !== 'all').map((sector) => (
                <option key={sector.id} value={sector.slug} className="bg-[#000000]">
                  {sector.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Project Form Modal (Inline) */}
        {isFormOpen && (
          <ProjectFormModal editingProjectId={editingProject} onClose={handleCloseForm} />
        )}

        {/* Projects Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 size={48} className="text-[#7CFF00] animate-spin mb-4" />
            <p className="text-gray-400 font-medium">Loading your projects...</p>
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectAdminCard
                key={project.id}
                project={project}
                onEdit={() => handleEditProject(project.id)}
                onDeleteRequest={() => setDeleteConfirmId(project.id)}
                isDeleting={deletingId === project.id}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl glass-card mb-6">
              <FolderKanban size={36} className="text-[#7CFF00]/60" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {searchQuery || filterSector !== 'all' ? 'No matching projects' : 'No projects yet'}
            </h4>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              {searchQuery || filterSector !== 'all'
                ? 'Try adjusting your search or filter to find what you\'re looking for.'
                : 'Start building your portfolio by adding your first project. Showcase your best work!'}
            </p>
            {!searchQuery && filterSector === 'all' && (
              <Button variant="primary" onClick={handleAddProject} className="group">
                <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                <span>Create First Project</span>
              </Button>
            )}
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md glass-card p-8 animate-fadeInUp">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={32} className="text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-white text-center mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Delete Project?
            </h3>
            <p className="text-gray-400 text-center mb-8">
              This action cannot be undone. The project will be permanently removed from your portfolio.
            </p>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={() => setDeleteConfirmId(null)}
                disabled={deletingId === deleteConfirmId}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDelete(deleteConfirmId)}
                isLoading={deletingId === deleteConfirmId}
                className="flex-1"
              >
                Delete Forever
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ===== PROJECT ADMIN CARD ===== */
interface ProjectAdminCardProps {
  project: Project;
  onEdit: () => void;
  onDeleteRequest: () => void;
  isDeleting: boolean;
}

const ProjectAdminCard: React.FC<ProjectAdminCardProps> = ({
  project, onEdit, onDeleteRequest, isDeleting,
}) => {
  const sectorName = PORTFOLIO_SECTORS.find(s => s.slug === project.sector)?.name || project.sector;

  return (
    <div className="group relative rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 overflow-hidden hover:border-[#7CFF00]/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#7CFF00]/10">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-[#0D0D0D]">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FolderKanban size={40} className="text-gray-700" />
          </div>
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/90 via-[#000000]/20 to-transparent" />

        {/* Hover action overlay */}
        <div className="absolute inset-0 bg-[#000000]/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-xl bg-[#7CFF00] flex items-center justify-center text-black shadow-xl hover:scale-110 transition-transform"
              title="View Live"
            >
              <Eye size={18} />
            </a>
          )}
          <button
            onClick={onEdit}
            className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-xl hover:scale-110 hover:bg-[#7CFF00] hover:border-[#7CFF00] transition-all"
            title="Edit"
          >
            <Edit3 size={18} />
          </button>
          <button
            onClick={onDeleteRequest}
            disabled={isDeleting}
            className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-xl hover:scale-110 hover:bg-red-500 hover:border-red-500 transition-all disabled:opacity-50"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>

        {/* Sector badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#000000]/80 backdrop-blur-md text-[#7CFF00] border border-[#7CFF00]/20">
            {sectorName}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h4 className="text-lg font-bold text-white mb-2 truncate group-hover:text-[#7CFF00] transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {project.title}
        </h4>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Tech chips */}
        {project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-md text-xs font-medium bg-white/5 text-gray-300 border border-white/5"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-white/5 text-gray-500 border border-white/5">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Clock size={12} />
            <span>
              {new Date(project.createdAt).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric',
              })}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={onEdit}
              className="p-1.5 rounded-lg text-gray-500 hover:text-[#7CFF00] hover:bg-[#7CFF00]/10 transition-all"
              title="Edit"
            >
              <Edit3 size={14} />
            </button>
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-gray-500 hover:text-[#7CFF00] hover:bg-[#7CFF00]/10 transition-all"
                title="View Live"
              >
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
