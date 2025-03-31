import {
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  CardActions,
} from "@mui/material";
import "./clientCreation.css";
import SaveIcon from "@mui/icons-material/Save";
import { dark } from "@mui/material/styles/createPalette";

export const ClientCreation = (clientCreationProps) => {
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
  } = clientCreationProps;
  return (
    <div className="clientCreationContainer">
      <h3
        className="clientCreationTitle"
        style={{ color: darkMode ? "white" : buttonColor }}
      >
        Nuevo Cliente
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
            <form onAbort={handleSubmit}>
              <Box display="flex" flexDirection="column" gap={2}>
                <Box sx={{ width: "100%", backgroundColor: "white" }}>
                  <TextField
                    fullWidth
                    label="Nombre"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    variant="outlined"
                  />
                </Box>

                <Box sx={{ width: "100%", backgroundColor: "white" }}>
                  <TextField
                    fullWidth
                    label="Apellido"
                    name="last_name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    variant="outlined"
                  />
                </Box>

                <Box sx={{ width: "100%", backgroundColor: "white" }}>
                  <TextField
                    fullWidth
                    label="Teléfono"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    // required
                    type="tel"
                    variant="outlined"
                  />
                </Box>

                <Box sx={{ width: "100%", backgroundColor: "white" }}>
                  <TextField
                    fullWidth
                    label="Correo Electrónico"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    // required
                    type="email"
                    variant="outlined"
                  />
                </Box>

                <Box sx={{ width: "100%", backgroundColor: "white" }}>
                  <TextField
                    fullWidth
                    label="Dirección"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    // required
                    variant="outlined"
                    multiline
                    rows={2}
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
