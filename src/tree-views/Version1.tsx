import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { File } from "../file.model";
import { useFiles } from "../useFiles";

const FileItem = ({ file }: { file: File | string }) => {
  if (typeof file === "string") {
    return <TreeItem label={file} nodeId={file} />;
  }

  if (file.children) {
    return (
      <TreeItem label={file.name} nodeId={file.name}>
        {file.children.map((child) => (
          <FileItem
            file={child}
            key={typeof child === "string" ? child : child.name}
          />
        ))}
      </TreeItem>
    );
  }

  return <TreeItem label={file.name} nodeId={file.name} />;
};

function Version1() {
  const { data: files, isLoading, isError, isPending } = useFiles();

  if (isLoading || isPending) {
    return "Loading...";
  }

  if (isError) {
    return "Error...";
  }

  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{}}
    >
      {files.map((file) => (
        <FileItem file={file} key={file.name} />
      ))}
    </TreeView>
  );
}

export default Version1;
