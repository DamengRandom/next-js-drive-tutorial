import { File, FileText } from "lucide-react";
import { type ReactNode } from "react";

// 定义文件和文件夹的接口
export interface FileItem {
  name: string;
  type: "file";
  path: string;
  size: string;
  modified: string;
  icon?: ReactNode;
}

export interface FolderItem {
  name: string;
  type: "folder";
  path: string;
  children: string[];
}

// 定义数据集合的类型
export type DataItem = FileItem | FolderItem;
export type MockDataType = Record<string, DataItem>;

// Mock data for files and folders
export const mockData: MockDataType = {
  root: {
    name: "My Drive",
    type: "folder",
    path: "/",
    children: ["documents", "images", "projects", "file1", "file2"],
  },
  documents: {
    name: "Documents",
    type: "folder",
    path: "/documents",
    children: ["doc1", "doc2", "doc3"],
  },
  images: {
    name: "Images",
    type: "folder",
    path: "/images",
    children: ["img1", "img2"],
  },
  projects: {
    name: "Projects",
    type: "folder",
    path: "/projects",
    children: ["project1", "project2"],
  },
  project1: {
    name: "Website Redesign",
    type: "folder",
    path: "/projects/project1",
    children: ["project1file1", "project1file2"],
  },
  project2: {
    name: "Mobile App",
    type: "folder",
    path: "/projects/project2",
    children: ["project2file1"],
  },
  file1: {
    name: "Important Notes.docx",
    type: "file",
    path: "/file1",
    size: "25 KB",
    modified: "Apr 2, 2023",
    icon: <FileText />,
  },
  file2: {
    name: "Budget 2023.xlsx",
    type: "file",
    path: "/file2",
    size: "156 KB",
    modified: "Mar 15, 2023",
    icon: <FileText />,
  },
  doc1: {
    name: "Resume.pdf",
    type: "file",
    path: "/documents/doc1",
    size: "215 KB",
    modified: "Jan 10, 2023",
    icon: <FileText />,
  },
  doc2: {
    name: "Contract.docx",
    type: "file",
    path: "/documents/doc2",
    size: "78 KB",
    modified: "Feb 22, 2023",
    icon: <FileText />,
  },
  doc3: {
    name: "Meeting Notes.txt",
    type: "file",
    path: "/documents/doc3",
    size: "12 KB",
    modified: "Apr 1, 2023",
    icon: <FileText />,
  },
  img1: {
    name: "Profile Photo.jpg",
    type: "file",
    path: "/images/img1",
    size: "1.2 MB",
    modified: "Mar 5, 2023",
    icon: <File />,
  },
  img2: {
    name: "Banner.png",
    type: "file",
    path: "/images/img2",
    size: "2.5 MB",
    modified: "Feb 15, 2023",
    icon: <File />,
  },
  project1file1: {
    name: "Wireframes.pdf",
    type: "file",
    path: "/projects/project1/project1file1",
    size: "3.7 MB",
    modified: "Mar 28, 2023",
    icon: <FileText />,
  },
  project1file2: {
    name: "Design Assets.zip",
    type: "file",
    path: "/projects/project1/project1file2",
    size: "15.8 MB",
    modified: "Mar 29, 2023",
    icon: <File />,
  },
  project2file1: {
    name: "App Mockups.sketch",
    type: "file",
    path: "/projects/project2/project2file1",
    size: "8.2 MB",
    modified: "Apr 3, 2023",
    icon: <File />,
  },
};

export type TFolder = {
  id: string;
  type: 'folder';
  name: string;
  parent: string | null;
}

export type TFile = {
  id: string;
  type: 'file';
  name: string;
  parent: string | null;
  size: string;
  url: string;
}

export const mockFolders: TFolder[] = [
  {
    id: 'root',
    type: 'folder',
    name: 'Root',
    parent: null,
  },
  {
    id: '1',
    type: 'folder',
    name: 'Documents',
    parent: 'root',
  },
  {
    id: '2',
    type: 'folder',
    name: 'Images',
    parent: 'root',
  },
  {
    id: '3',
    type: 'folder',
    name: 'Work',
    parent: 'root',
  },
];

export const mockFiles: TFile[] = [
  {
    id: '11',
    type: 'file',
    name: 'Resume.docx',
    parent: 'root',
    size: '11.2MB',
    url: '/files/resume.docx',
  },
  {
    id: '12',
    type: 'file',
    name: 'Image.jpg',
    parent: 'root',
    size: '21.24MB',
    url: '/files/image.jpg',
  },
  {
    id: '13',
    type: 'file',
    name: 'ImageTwo.png',
    parent: 'root',
    size: '21.24MB',
    url: '/files/image-two.png',
  },
  {
    id: '14',
    type: 'file',
    name: 'BookOne.pdf',
    parent: 'root',
    size: '4.2MB',
    url: '/files/book-one.pdf',
  },
];
