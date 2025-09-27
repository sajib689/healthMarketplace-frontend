/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Tag {
  name: string;
}

export interface JobPost {
  author: {
    name: string;
    avatar: string;
  };
  title: string;
  postedTime: string;
  tags: string[];
  priceRange: {
    min: number;
    max: number;
    type: string;
  };
  deadline: {
    date: string;
  };
  description: string;
  scopeOfWork?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export interface JobCardProps {
  name: string;
  id?: boolean | string;
  avatar: string;
  title: string;
  postedTime: string;
  tags?: string[];
  budget: string;
  priceType: string;
  deadline: string;
  description?: string;
  className: string;
  scopeWork?: string;
  projectId: string;
  scopeOfWork?: string;
  pending?: boolean;
  favorite?: boolean;
  buttonLoading?: boolean;
  isFavorite?: boolean;
  handleToggleFavorite: (itemId: string, itemType: "PROJECT") => void;
}

export interface UpdateProjectFunction {
  handleUpdateProjects: (data: any, id: string) => void;
}
export interface DeleteProjectFunction {
  handleDeleteProject: (projectId: string) => void;
}
