"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ChevronRight,
  File,
  FileText,
  Folder,
  Grid,
  Home,
  List,
  MoreVertical,
  Plus,
  Share,
  Star,
  Trash,
  Upload,
  Users,
} from "lucide-react"

import { Button } from "~/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
import { Input } from "~/components/ui/input"
import { ScrollArea } from "~/components/ui/scroll-area"
import { Separator } from "~/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip"
import { type ReactNode } from "react"

// 定义文件和文件夹的接口
interface FileItem {
  name: string;
  type: "file";
  path: string;
  size: string;
  modified: string;
  icon?: ReactNode;
}

interface FolderItem {
  name: string;
  type: "folder";
  path: string;
  children: string[];
}

// 定义数据集合的类型
type DataItem = FileItem | FolderItem;
type MockDataType = Record<string, DataItem>;

// Mock data for files and folders
const mockData: MockDataType = {
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
}

export default function DriveClone() {
  const [currentPath, setCurrentPath] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Get current folder based on path
  const getCurrentFolder = (): string => {
    if (currentPath.length === 0) return "root"

    return currentPath[currentPath.length - 1] ?? "root"
  }

  // Get items in current folder
  const getCurrentItems = (): DataItem[] => {
    const currentFolder = getCurrentFolder()
    const folderData = mockData[currentFolder]
    
    if (folderData?.type !== "folder") {
      return []
    }
    
    const children = folderData.children ?? []
    return children
      .map((id) => mockData[id])
      .filter((item): item is DataItem => item !== undefined)
  }

  // Navigate to a folder
  const navigateToFolder = (folderId: string) => {
    setCurrentPath([...currentPath, folderId])
  }

  // Navigate up one level
  const navigateUp = () => {
    if (currentPath.length > 0) {
      setCurrentPath(currentPath.slice(0, -1))
    }
  }

  // Navigate to specific path index
  const navigateToPathIndex = (index: number) => {
    setCurrentPath(currentPath.slice(0, index + 1))
  }

  // 定义面包屑项的接口
  interface BreadcrumbItem {
    id: string;
    name: string;
  }

  // Get breadcrumb items
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = [{ id: "root", name: "My Drive" }]

    let currentPathString = ""
    currentPath.forEach((pathPart) => {
      currentPathString += `/${pathPart}`
      breadcrumbs.push({
        id: pathPart,
        name: mockData[pathPart]?.name ?? pathPart,
      })
    })

    return breadcrumbs
  }

  // Mock upload function
  const handleUpload = () => {
    alert("Upload functionality would open a file picker here")
  }

  const items = getCurrentItems()
  const breadcrumbs = getBreadcrumbs()

  return (
    <div className="flex h-screen flex-col">
      <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
        <div className="flex items-center gap-2">
          <Folder className="h-6 w-6 text-blue-500" />
          <h1 className="text-lg font-semibold">Google Drive Clone</h1>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Input type="search" placeholder="Search files and folders..." className="md:w-[300px] lg:w-[400px]" />
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden w-[240px] flex-col border-r bg-background md:flex">
          <div className="flex h-14 items-center border-b px-4">
            <Button className="w-full justify-start gap-2 rounded-full" size="sm">
              <Plus className="h-4 w-4" />
              New
            </Button>
          </div>
          <nav className="grid gap-1 p-2">
            <Button variant="ghost" className="justify-start gap-2" onClick={() => setCurrentPath([])}>
              <Home className="h-4 w-4" />
              My Drive
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <Share className="h-4 w-4" />
              Shared with me
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <Star className="h-4 w-4" />
              Starred
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <Trash className="h-4 w-4" />
              Trash
            </Button>
            <Separator className="my-2" />
            <Button variant="ghost" className="justify-start gap-2">
              <Users className="h-4 w-4" />
              Shared drives
            </Button>
          </nav>
        </aside>
        <main className="flex flex-1 flex-col">
          <div className="flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-2">
              {currentPath.length > 0 && (
                <Button variant="ghost" size="icon" onClick={navigateUp}>
                  <ChevronRight className="h-4 w-4 rotate-180" />
                </Button>
              )}
              <div className="flex items-center gap-1">
                {breadcrumbs.map((crumb, index) => (
                  <div key={crumb.id} className="flex items-center">
                    {index > 0 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                    <Button variant="ghost" className="h-auto p-1" onClick={() => navigateToPathIndex(index)}>
                      {crumb.name}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setViewMode("list")}
                      className={viewMode === "list" ? "bg-muted" : ""}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>List view</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setViewMode("grid")}
                      className={viewMode === "grid" ? "bg-muted" : ""}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Grid view</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Button onClick={handleUpload} className="gap-2">
                <Upload className="h-4 w-4" />
                Upload
              </Button>
            </div>
          </div>
          <ScrollArea className="flex-1 p-4">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {items.map((item) => (
                  <div
                    key={item.path}
                    className="group flex flex-col items-center gap-2 rounded-lg border p-4 hover:bg-muted/50"
                  >
                    {item.type === "folder" ? (
                      <div
                        className="cursor-pointer"
                        onClick={() => navigateToFolder(item.path.split("/").filter(Boolean).pop() ?? "")}
                      >
                        <Folder className="h-12 w-12 text-blue-500" />
                        <div className="mt-2 text-center font-medium">{item.name}</div>
                      </div>
                    ) : (
                      <Link href={item.path} target="_blank" className="flex flex-col items-center">
                        {item.icon ? (
                          <div className="h-12 w-12 text-gray-500">{item.icon}</div>
                        ) : (
                          <File className="h-12 w-12 text-gray-500" />
                        )}
                        <div className="mt-2 text-center font-medium">{item.name}</div>
                      </Link>
                    )}
                    <div className="invisible absolute right-2 top-2 group-hover:visible">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Share</DropdownMenuItem>
                          <DropdownMenuItem>Move</DropdownMenuItem>
                          <DropdownMenuItem>Rename</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border">
                <div className="grid grid-cols-12 gap-4 p-4 font-medium text-muted-foreground">
                  <div className="col-span-6">Name</div>
                  <div className="col-span-3">Modified</div>
                  <div className="col-span-2">Size</div>
                  <div className="col-span-1"></div>
                </div>
                <Separator />
                {items.map((item) => (
                  <div key={item.path} className="group">
                    <div className="grid grid-cols-12 items-center gap-4 p-4 hover:bg-muted/50">
                      <div className="col-span-6 flex items-center gap-2">
                        {item.type === "folder" ? (
                          <div
                            className="flex cursor-pointer items-center gap-2"
                            onClick={() => navigateToFolder(item.path.split("/").filter(Boolean).pop() ?? "")}
                          >
                            <Folder className="h-5 w-5 text-blue-500" />
                            <span className="font-medium">{item.name}</span>
                          </div>
                        ) : (
                          <Link href={item.path} target="_blank" className="flex items-center gap-2">
                            {item.icon ? (
                              <div className="h-5 w-5 text-gray-500">{item.icon}</div>
                            ) : (
                              <File className="h-5 w-5 text-gray-500" />
                            )}
                            <span className="font-medium">{item.name}</span>
                          </Link>
                        )}
                      </div>
                      <div className="col-span-3 text-sm text-muted-foreground">
                        {item.type === "file" ? item.modified : "—"}
                      </div>
                      <div className="col-span-2 text-sm text-muted-foreground">
                        {item.type === "file" ? item.size : "—"}
                      </div>
                      <div className="col-span-1 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Share</DropdownMenuItem>
                            <DropdownMenuItem>Move</DropdownMenuItem>
                            <DropdownMenuItem>Rename</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <Separator />
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </main>
      </div>
    </div>
  )
}

