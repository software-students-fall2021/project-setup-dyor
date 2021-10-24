import { PortfolioTable } from "../../components/PortfolioTable/PortfolioTable";
import Typography from "@mui/material/Typography";
import styles from "/Users/hanzallausman/Documents/Software Engr/project-setup-dyor/front-end/src/containers/PortfolioPage/PortfolioPage.module.css";
import { Box } from "@mui/system";
import { DailyGraph } from "/Users/hanzallausman/Documents/Software Engr/project-setup-dyor/front-end/src/components/DailyGraph/DailyGraph.jsx";

export function PortfolioPage() {
  return (
    <Box className={styles.pageDiv}>
      <Typography weight="bold" color="primary" variant="h4">
        Portfolio
      </Typography>

      <Box className={styles.portfolioTable}>
        <PortfolioTable></PortfolioTable>
      </Box>
      <Box className={styles.portfolioTable}>
        <DailyGraph></DailyGraph>
      </Box>
    </Box>
  );
}
