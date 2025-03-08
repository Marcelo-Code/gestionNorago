import {
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  CardActions,
} from "@mui/material";
import "./serviceCreation.css";
import SaveIcon from "@mui/icons-material/Save";
import { ClientSelect } from "../../../layout/select/Select";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export const ServiceCreation = (serviceCreationProps) => {
  const {
    handleSubmit,
    handleChange,
    formData,
    handleGoBack,
    clients,
    isLoading,
    darkMode,
    darkColor,
    lightColor,
    buttonColor,
  } = serviceCreationProps;

  return (
    <div className="clientCreationContainer">
      <h5
        className="clientCreationTitle"
        style={{ color: darkMode ? "white" : buttonColor }}
      >
        Nuevo Servicio
      </h5>
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
              <ClientSelect
                name="client_id"
                clients={clients}
                value={formData.client_id}
                onChange={handleChange}
                label="Cliente"
                required
                //  error={/* tu lógica de error */}
                //  helperText={/* tu mensaje de error o ayuda */}
              />
              <Box sx={{ width: "100%", backgroundColor: "white" }}>
                <TextField
                  fullWidth
                  label="Fecha"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  // required
                  variant="outlined"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
              <Box sx={{ width: "100%", backgroundColor: "white" }}>
                <TextField
                  fullWidth
                  label="Equipo"
                  name="device"
                  value={formData.device}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  type="text"
                />
              </Box>
              <Box sx={{ width: "100%", backgroundColor: "white" }}>
                <TextField
                  fullWidth
                  label="Nro Serie"
                  name="serial_number"
                  value={formData.service_number}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  type="text"
                />
              </Box>
              <Box sx={{ width: "100%", backgroundColor: "white" }}>
                <TextField
                  fullWidth
                  label="Servicio"
                  name="service_text"
                  value={formData.service_text}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  type="text"
                  multiline
                  rows={5}
                />
              </Box>

              <Box sx={{ width: "100%", backgroundColor: "white" }}>
                <TextField
                  fullWidth
                  label="Repuestos"
                  name="inputs"
                  value={formData.inputs}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  multiline
                  rows={3}
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
                  label="Precio Repuestos"
                  name="inputs_price"
                  value={formData.inputs_price}
                  onChange={handleChange}
                  required
                  type="number"
                  variant="outlined"
                  inputProps={{ min: 0 }}
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
                  name="total_price"
                  value={formData.total_price}
                  onChange={handleChange}
                  required
                  type="number"
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
                    onClick={handleSubmit}
                    loading={isLoading}
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
                  >
                    Volver
                  </Button>
                </Box>
              </CardActions>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};
