export interface Tag {
  name: string;
}

export interface JobPost {
  company: {
    name: string;
    logo: string;
  };
  title: string;
  location: string;
  postedTime: string;
  tags: Tag[];
  salary: {
    range: string;
  };
  isBookmarked?: boolean;
}
