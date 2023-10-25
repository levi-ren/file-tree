import GitHubIcon from "@mui/icons-material/GitHub";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Link,
  Typography,
} from "@mui/material";
import Version1 from "./tree-views/Version1";
import Version2 from "./tree-views/Version2";
import Version3 from "./tree-views/Version3";
import { useFiles } from "./useFiles";

function App() {
  useFiles();

  return (
    <main>
      <Typography variant="h3" component="h1">
        File Tree
        <Link
          href="https://github.com/levi-ren/file-tree"
          target="_blank"
          rel="noreferrer"
          underline="none"
          sx={{ marginLeft: 2 }}
        >
          <GitHubIcon fontSize="large" />
        </Link>
      </Typography>
      <Divider sx={{ marginY: 2 }} />
      <Accordion>
        <AccordionSummary>Version 1 - MUI Tree View</AccordionSummary>
        <AccordionDetails>
          <Version1 />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>Version 2 - Custom</AccordionSummary>
        <AccordionDetails>
          <Version2 />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>Version 3 - List Item</AccordionSummary>
        <AccordionDetails>
          <Version3 />
        </AccordionDetails>
      </Accordion>
    </main>
  );
}

export default App;
