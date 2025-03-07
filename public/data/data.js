export const clients = [
  {
    id: 1,
    name: "John",
    last_name: "Doe",
    phone: "123-456-7890",
    email: "john.doe@example.com",
    address: "123 Main St",
  },
  {
    id: 2,
    name: "Jane",
    last_name: "Smith",
    phone: "987-654-3210",
    email: "jane.smith@example.com",
    address: "456 Elm St",
  },
  {
    id: 3,
    name: "Robert",
    last_name: "Jones",
    phone: "555-123-4567",
    email: "robert.jones@example.com",
    address: "789 Oak St",
  },
  {
    id: 4,
    name: "Emily",
    last_name: "Brown",
    phone: "111-222-3333",
    email: "emily.brown@example.com",
    address: "101 Pine St",
  },
  {
    id: 5,
    name: "Michael",
    last_name: "Davis",
    phone: "444-555-6666",
    email: "michael.davis@example.com",
    address: "222 Cedar St",
  },
  {
    id: 6,
    name: "Jessica",
    last_name: "Wilson",
    phone: "777-888-9999",
    email: "jessica.wilson@example.com",
    address: "333 Maple St",
  },
  {
    id: 7,
    name: "David",
    last_name: "Garcia",
    phone: "123-987-4560",
    email: "david.garcia@example.com",
    address: "444 Birch St",
  },
  {
    id: 8,
    name: "Ashley",
    last_name: "Rodriguez",
    phone: "321-654-0987",
    email: "ashley.rodriguez@example.com",
    address: "555 Walnut St",
  },
  {
    id: 9,
    name: "Christopher",
    last_name: "Martinez",
    phone: "654-123-7890",
    email: "christopher.martinez@example.com",
    address: "666 Cherry St",
  },
  {
    id: 10,
    name: "Amanda",
    last_name: "Anderson",
    phone: "987-321-0546",
    email: "amanda.anderson@example.com",
    address: "777 Spruce St",
  },
];

export const services = [
  {
    id: 1,
    name: "Juan",
    last_name: "Pérez",
    date: "2023-06-01",
    service_text: "Reparación de pantalla de celular",
    price: 5000,
    inputs_price: 2000,
    inputs: "Pantalla LCD, Adhesivo especial", // Cambio a string
    total_price: 7000,
    device: "Celular", // Nuevo campo
    serial_number: "SN123456789", // Nuevo campo
  },
  {
    id: 2,
    name: "María",
    last_name: "González",
    date: "2023-06-02",
    service_text: "Cambio de batería de laptop",
    price: 6000,
    inputs_price: 3500,
    inputs: "Batería original", // Cambio a string
    total_price: 9500,
    device: "Laptop", // Nuevo campo
    serial_number: "SN987654321", // Nuevo campo
  },
  {
    id: 3,
    name: "Carlos",
    last_name: "Ramírez",
    date: "2023-06-03",
    service_text: "Reemplazo de puerto de carga",
    price: 4000,
    inputs_price: 1500,
    inputs: "Puerto USB tipo C, Soldadura", // Cambio a string
    total_price: 5500,
    device: "Celular", // Nuevo campo
    serial_number: "SN192837465", // Nuevo campo
  },
  {
    id: 4,
    name: "Lucía",
    last_name: "Fernández",
    date: "2023-06-04",
    service_text: "Reparación de motherboard",
    price: 8000,
    inputs_price: 5000,
    inputs: "Chipset, Condensadores, Pasta térmica", // Cambio a string
    total_price: 13000,
    device: "PC", // Nuevo campo
    serial_number: "SN564738291", // Nuevo campo
  },
  {
    id: 5,
    name: "Pedro",
    last_name: "Díaz",
    date: "2023-06-05",
    service_text: "Cambio de teclado de laptop",
    price: 4500,
    inputs_price: 2000,
    inputs: "Teclado original", // Cambio a string
    total_price: 6500,
    device: "Laptop", // Nuevo campo
    serial_number: "SN192837491", // Nuevo campo
  },
  {
    id: 6,
    name: "Ana",
    last_name: "López",
    date: "2023-06-06",
    service_text: "Sustitución de disco duro por SSD",
    price: 7000,
    inputs_price: 8000,
    inputs: "SSD 512GB", // Cambio a string
    total_price: 15000,
    device: "Laptop", // Nuevo campo
    serial_number: "SN546738210", // Nuevo campo
  },
  {
    id: 7,
    name: "Miguel",
    last_name: "Torres",
    date: "2023-06-07",
    service_text: "Reparación de circuito de alimentación",
    price: 5000,
    inputs_price: 3000,
    inputs: "Transistores, Fusibles, Condensadores", // Cambio a string
    total_price: 8000,
    device: "PC", // Nuevo campo
    serial_number: "SN836482910", // Nuevo campo
  },
  {
    id: 8,
    name: "Laura",
    last_name: "Sosa",
    date: "2023-06-08",
    service_text: "Reemplazo de ventilador de laptop",
    price: 3500,
    inputs_price: 1800,
    inputs: "Ventilador original, Pasta térmica", // Cambio a string
    total_price: 5300,
    device: "Laptop", // Nuevo campo
    serial_number: "SN283746159", // Nuevo campo
  },
  {
    id: 9,
    name: "Roberto",
    last_name: "Mendoza",
    date: "2023-06-09",
    service_text: "Recuperación de datos de disco duro",
    price: 9000,
    inputs_price: 0,
    inputs: "", // Cambio a string vacío
    total_price: 9000,
    device: "Disco duro", // Nuevo campo
    serial_number: "SN190283746", // Nuevo campo
  },
  {
    id: 10,
    name: "Cecilia",
    last_name: "Navarro",
    date: "2023-06-10",
    service_text: "Reparación de parlantes de laptop",
    price: 4000,
    inputs_price: 2500,
    inputs: "Parlantes nuevos", // Cambio a string
    total_price: 6500,
    device: "Laptop", // Nuevo campo
    serial_number: "SN728349581", // Nuevo campo
  },
  {
    id: 11,
    name: "Javier",
    last_name: "Castro",
    date: "2023-06-11",
    service_text: "Cambio de bisagras de pantalla",
    price: 5000,
    inputs_price: 3000,
    inputs: "Bisagras reforzadas", // Cambio a string
    total_price: 8000,
    device: "Laptop", // Nuevo campo
    serial_number: "SN192837465", // Nuevo campo
  },
  {
    id: 12,
    name: "Patricia",
    last_name: "Ríos",
    date: "2023-06-12",
    service_text: "Reparación de tarjeta gráfica",
    price: 12000,
    inputs_price: 7000,
    inputs: "Memoria VRAM, Pasta térmica", // Cambio a string
    total_price: 19000,
    device: "PC", // Nuevo campo
    serial_number: "SN564738292", // Nuevo campo
  },
  {
    id: 13,
    name: "Fernando",
    last_name: "Gómez",
    date: "2023-06-13",
    service_text: "Limpieza interna y cambio de pasta térmica",
    price: 3000,
    inputs_price: 1200,
    inputs: "Pasta térmica, Aire comprimido", // Cambio a string
    total_price: 4200,
    device: "Laptop", // Nuevo campo
    serial_number: "SN874653920", // Nuevo campo
  },
  {
    id: 14,
    name: "Sofía",
    last_name: "Herrera",
    date: "2023-06-14",
    service_text: "Instalación de software y configuración",
    price: 2500,
    inputs_price: 0,
    inputs: "", // Cambio a string vacío
    total_price: 2500,
    device: "Laptop", // Nuevo campo
    serial_number: "SN456738291", // Nuevo campo
  },
  {
    id: 15,
    name: "Diego",
    last_name: "Martínez",
    date: "2023-06-15",
    service_text: "Reemplazo de cámara de celular",
    price: 4500,
    inputs_price: 2800,
    inputs: "Cámara trasera original", // Cambio a string
    total_price: 7300,
    device: "Celular", // Nuevo campo
    serial_number: "SN758492031", // Nuevo campo
  },
  {
    id: 16,
    name: "Valeria",
    last_name: "Cruz",
    date: "2023-06-16",
    service_text: "Cambio de pantalla táctil de tablet",
    price: 6000,
    inputs_price: 3500,
    inputs: "Pantalla táctil original", // Cambio a string
    total_price: 9500,
    device: "Tablet", // Nuevo campo
    serial_number: "SN309485762", // Nuevo campo
  },
  {
    id: 17,
    name: "Gustavo",
    last_name: "Ortega",
    date: "2023-06-17",
    service_text: "Reparación de conexiones de red en PC",
    price: 5500,
    inputs_price: 2500,
    inputs: "Tarjeta de red, Cables RJ45", // Cambio a string
    total_price: 8000,
    device: "PC", // Nuevo campo
    serial_number: "SN123908475", // Nuevo campo
  },
  {
    id: 18,
    name: "Carolina",
    last_name: "Morales",
    date: "2023-06-18",
    service_text: "Cambio de pila de BIOS en motherboard",
    price: 1500,
    inputs_price: 500,
    inputs: "Batería CMOS", // Cambio a string
    total_price: 2000,
    device: "PC", // Nuevo campo
    serial_number: "SN564738291", // Nuevo campo
  },
  {
    id: 19,
    name: "Sebastián",
    last_name: "Vega",
    date: "2023-06-19",
    service_text: "Reparación de fuente de poder",
    price: 7000,
    inputs_price: 4000,
    inputs: "Capacitores, Transformador", // Cambio a string
    total_price: 11000,
    device: "PC", // Nuevo campo
    serial_number: "SN293847561", // Nuevo campo
  },
  {
    id: 20,
    name: "Andrea",
    last_name: "Peralta",
    date: "2023-06-20",
    service_text: "Reemplazo de pantalla de smartwatch",
    price: 5000,
    inputs_price: 2500,
    inputs: "Pantalla OLED", // Cambio a string
    total_price: 7500,
    device: "Smartwatch", // Nuevo campo
    serial_number: "SN829347561", // Nuevo campo
  },
];
