import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
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
};

const FileItem = ({ file, setActiveItem }: FileItemProps) => {
  const [open, setOpen] = useState(false);

  if (typeof file === "string") {
    return (
      <ListItemButton sx={{ pl: 4 }} onClick={() => setActiveItem(file)}>
        <ListItemText primary={file} />
      </ListItemButton>
    );
  }

  if (file.children) {
    return (
      <>
        <ListItemButton onClick={() => setOpen((p) => !p)}>
          <ListItemText primary={file.name} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} unmountOnExit>
          {file.children.map((child) => (
            <Box
              sx={{ pl: 4 }}
              key={typeof child === "string" ? child : child.name}
            >
              <FileItem file={child} setActiveItem={setActiveItem} />
            </Box>
          ))}
        </Collapse>
      </>
    );
  }

  return (
    <ListItemButton>
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
          <FileItem file={file} key={file.name} setActiveItem={setActiveItem} />
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
