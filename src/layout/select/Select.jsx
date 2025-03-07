import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Autocomplete,
} from "@mui/material";

// Componente Select con Autocomplete y búsqueda
export function ClientSelect({
  clients,
  name,
  value,
  onChange,
  label = "Cliente",
  placeholder = "Seleccionar cliente",
  disabled = false,
  required = false,
  error = false,
  helperText,
  fullWidth = true,
}) {
  return (
    <Autocomplete
      name={name}
      options={clients}
      getOptionLabel={(option) => `${option.name} ${option.last_name}`}
      value={clients.find((client) => client.id === value) || null}
      onChange={(_, newValue) => {
        onChange({
          target: { name, value: newValue ? newValue.id : "" },
        });
      }}
      disabled={disabled}
      fullWidth={fullWidth}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          required={required}
          error={error}
          helperText={helperText}
        />
      )}
    />
  );
}

// Versión alternativa con Select básico si prefieres un select simple
export function ClientSelectBasic({
  clients,
  value,
  onChange,
  label = "Cliente",
  placeholder = "Seleccionar cliente",
  disabled = false,
  required = false,
  error = false,
  helperText,
  fullWidth = true,
}) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <FormControl
      fullWidth={fullWidth}
      required={required}
      error={error}
      disabled={disabled}
    >
      <InputLabel id="client-select-label">{label}</InputLabel>
      <Select
        labelId="client-select-label"
        value={value || ""}
        label={label}
        onChange={handleChange}
        displayEmpty
      >
        <MenuItem value="" disabled>
          <em>{placeholder}</em>
        </MenuItem>
        {clients.map((client) => (
          <MenuItem key={client.id} value={client.id}>
            {client.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
