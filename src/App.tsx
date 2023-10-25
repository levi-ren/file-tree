import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Version1 from "./tree-views/Version1";
import Version2 from "./tree-views/Version2";
import Version3 from "./tree-views/Version3";
import { useFiles } from "./useFiles";

function App() {
  useFiles();

  return (
    <Stack component="main" spacing={2}>
      <Typography variant="h3" component="h1">
        File Tree
      </Typography>
      <Divider />

      <Box>
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
      </Box>
    </Stack>
  );
}

export default App;
