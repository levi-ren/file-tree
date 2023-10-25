import { Box, Collapse, Typography } from "@mui/material";
import { useState } from "react";
import { File } from "../file.model";
import { useFiles } from "../useFiles";

const FileItem = ({ file }: { file: File | string }) => {
  const [open, setOpen] = useState(false);

  if (typeof file === "string") {
    return (
      <Box
        component="li"
        sx={{
          listStyle: "none",
        }}
      >
        <Typography
          sx={{
            cursor: "pointer",
            transition: "all ease 0.2s ",
            "&:hover": {
              background: "#eee",
            },
          }}
        >
          {file}
        </Typography>
      </Box>
    );
  }

  if (file.children) {
    return (
      <Box
        component="li"
        sx={{
          listStyle: "none",
          paddingInlineStart: 1,
          borderLeft: 1,
        }}
      >
        <Typography
          sx={{
            cursor: "pointer",
            transition: "all ease 0.2s ",
            "&:hover": {
              background: "#eee",
            },
          }}
          onClick={() => setOpen((p) => !p)}
        >
          {file.name}
        </Typography>
        <Collapse in={open}>
          {file.children.map((child) => (
            <Box
              component="ul"
              sx={{
                paddingInlineStart: 3,
              }}
              key={typeof child === "string" ? child : child.name}
            >
              <FileItem file={child} />
            </Box>
          ))}
        </Collapse>
      </Box>
    );
  }

  return (
    <Box
      component="li"
      sx={{
        listStyle: "none",
        paddingInlineStart: 1,
        borderLeft: 1,
      }}
    >
      <Typography
        sx={{
          cursor: "pointer",
          transition: "all ease 0.2s ",
          "&:hover": {
            background: "#eee",
          },
        }}
      >
        {file.name}
      </Typography>
    </Box>
  );
};

function Version2() {
  const { data: files, isLoading, isError, isPending } = useFiles();

  if (isLoading || isPending) {
    return "Loading...";
  }

  if (isError) {
    return "Error...";
  }

  return (
    <Box component="ul">
      {files.map((file) => (
        <FileItem file={file} key={file.name} />
      ))}
    </Box>
  );
}

export default Version2;
