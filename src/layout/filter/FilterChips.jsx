import { Box, Chip } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

export const FilterChips = (filterChipsProps) => {
  const { activeFilters, removeFilter, resetSort } = filterChipsProps;

  return (
    <div style={{ width: "100%", height: "auto" }}>
      {activeFilters.length > 0 && (
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          {activeFilters.map((filter) => (
            <Chip
              key={filter.key}
              label={filter.label}
              onDelete={() =>
                filter.key !== "sort" ? removeFilter(filter.key) : resetSort()
              }
              deleteIcon={<CloseIcon />}
              variant="outlined"
              size="small"
              sx={{ backgroundColor: "white", marginBot: "20px" }}
            />
          ))}
        </Box>
      )}
    </div>
  );
};
