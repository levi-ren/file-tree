import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FolderTwoToneIcon from "@mui/icons-material/FolderTwoTone";
import InsertDriveFileTwoToneIcon from "@mui/icons-material/InsertDriveFileTwoTone";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { File } from "../file.model";
import { useFiles } from "../useFiles";

type FileItemProps = {
  file: File | string;
  setActiveItem: (item: string) => void;
  directory: string;
};

const FileItem = ({ file, setActiveItem, directory }: FileItemProps) => {
  const [open, setOpen] = useState(false);

  if (typeof file === "string") {
    return (
      <ListItemButton
        sx={{ pl: 4 }}
        onClick={() => setActiveItem(`${directory}/${file}`)}
      >
        <ListItemIcon>
          <InsertDriveFileTwoToneIcon />
        </ListItemIcon>
        <ListItemText primary={file} />
      </ListItemButton>
    );
  }

  if (file.children) {
    return (
      <>
        <ListItemButton onClick={() => setOpen((p) => !p)}>
          <ListItemIcon>
            <FolderTwoToneIcon />
          </ListItemIcon>
          <ListItemText primary={file.name} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} unmountOnExit>
          {file.children.map((child) => (
            <Box
              sx={{ pl: 4 }}
              key={typeof child === "string" ? child : child.name}
            >
              <FileItem
                file={child}
                setActiveItem={setActiveItem}
                directory={
                  typeof child === "string"
                    ? directory
                    : directory.concat(`/${child.name}`)
                }
              />
            </Box>
          ))}
        </Collapse>
      </>
    );
  }

  return (
    <ListItemButton>
      <ListItemIcon>
        <FolderTwoToneIcon />
      </ListItemIcon>
      <ListItemText primary={file.name} />
    </ListItemButton>
  );
};

function Version3() {
  const [activeItem, setActiveItem] = useState("");
  const { data: files, isLoading, isError, isPending } = useFiles();

  if (isLoading || isPending) {
    return "Loading...";
  }

  if (isError) {
    return "Error...";
  }

  return (
    <Stack direction="row" spacing={2}>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          border: 1,
          borderRadius: 2,
          overflow: "hidden",
          borderColor: "lightgray",
        }}
        component="nav"
        subheader={
          <ListSubheader component="div" sx={{ backgroundColor: "lightgray" }}>
            System Files
          </ListSubheader>
        }
      >
        {files.map((file) => (
          <FileItem
            file={file}
            key={file.name}
            setActiveItem={setActiveItem}
            directory={file.name}
          />
        ))}
      </List>
      <Stack
        sx={{
          flex: 1,
          border: 1,
          borderRadius: 2,
          borderColor: "lightgray",
        }}
        justifyContent="center"
        alignItems="center"
      >
        {activeItem}
      </Stack>
    </Stack>
  );
}

export default Version3;
