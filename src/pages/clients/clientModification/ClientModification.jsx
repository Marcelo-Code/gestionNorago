import {
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  CardActions,
} from "@mui/material";
import "./clientModification.css";
import SaveIcon from "@mui/icons-material/Save";

export const ClientModification = (clientModificationProps) => {
  const {
    handleUpdateClient,
    handleChange,
    formData,
    handleGoBack,
    clientId,
    modifiedFlag,
    darkMode,
    darkColor,
    lightColor,
    buttonColor,
  } = clientModificationProps;

  return (
    <div className="clientModificationContainer">
      <h3
        className="clientModificationTitle"
        style={{ color: darkMode ? "white" : buttonColor }}
      >
        Modificar Cliente
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
            <Box display="flex" flexDirection="column" gap={2}>
              <Box
                sx={{
                  width: "100%",
                  backgroundColor: "white",
                }}
              >
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
                  value={formData.last_name}
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
                  required
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
                  required
                  variant="outlined"
                  multiline
                  rows={2}
                />
              </Box>

              <CardActions>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{ mt: 2 }}
                  startIcon={<SaveIcon />}
                  onClick={() => handleUpdateClient(clientId, formData)}
                  disabled={!modifiedFlag}
                >
                  Guardar
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  size="large"
                  sx={{
                    mt: 2,
                    borderColor: darkMode ? "white" : buttonColor,
                    color: darkMode ? "white" : buttonColor,
                  }}
                  onClick={() => handleGoBack()}
                >
                  Volver
                </Button>
              </CardActions>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};
