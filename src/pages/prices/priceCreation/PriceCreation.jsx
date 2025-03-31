import {
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  CardActions,
} from "@mui/material";
import "./priceCreation.css";
import SaveIcon from "@mui/icons-material/Save";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export const PriceCreation = (priceCreationProps) => {
  const {
    handleSubmit,
    handleChange,
    formData,
    handleGoBack,
    isLoading,
    modifiedFlag,
    darkMode,
    darkColor,
    lightColor,
    buttonColor,
  } = priceCreationProps;
  return (
    <div className="priceCreationContainer">
      <h3
        className="priceCreationTitle"
        style={{ color: darkMode ? "white" : buttonColor }}
      >
        Nuevo Precio
      </h3>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Card
          sx={{
            maxWidth: 600,
            width: "100%",
            backgroundColor: darkMode ? lightColor : "white",
          }}
        >
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Box display="flex" flexDirection="column" gap={2}>
                <Box sx={{ width: "100%", backgroundColor: "white" }}>
                  <TextField
                    fullWidth
                    label="Nombre servicio"
                    name="service_name"
                    value={formData.service_name}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    multiline
                    rows={2}
                  />
                </Box>

                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1,
                  }}
                >
                  <AttachMoneyIcon />
                  <TextField
                    sx={{ flex: 1, backgroundColor: "white" }}
                    label="Precio Servicio"
                    name="service_price"
                    value={formData.service_price}
                    onChange={handleChange}
                    required
                    type="number"
                    variant="outlined"
                    inputProps={{ min: 0 }}
                  />
                </Box>

                <CardActions>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      width: "100%",
                      gap: 2,
                    }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      sx={{
                        width: { xs: "100%", sm: "48%" },
                      }}
                      startIcon={<SaveIcon />}
                      disabled={!modifiedFlag}
                    >
                      Guardar
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      sx={{
                        width: {
                          xs: "100%",
                          sm: "48%",
                          borderColor: darkMode ? "white" : buttonColor,
                          color: darkMode ? "white" : buttonColor,
                        },
                      }}
                      onClick={() => handleGoBack()}
                      loading={isLoading}
                    >
                      Volver
                    </Button>
                  </Box>
                </CardActions>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};
