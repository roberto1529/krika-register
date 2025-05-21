const { useState, useRef, useEffect } = React;
// const API = 'http://192.168.12.1:3000/api/clients/create';
const API = 'https://api-dev.krika.co/api/clients/create';
const Formulario = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    cedula: '',
    fecha_nac: '',
    telefono: '',
    ciudad: '',
    direccion: '',
    direccion2: '',
    direccion3: '',
    direccion4: '',
    email: '',
    origin: 'sw_web_reg',
    a_t_c: false,
    a_p_d: false,
    newle: false
  });

  const dateInputRef = useRef(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {

    if (dateInputRef.current && window.flatpickr) {
      window.flatpickr(dateInputRef.current, {
        dateFormat: "Y-m-d",
        onChange: (selectedDates, dateStr) => {
          setFormData(prev => ({ ...prev, fecha_nac: dateStr }));
        }
      });
    }

    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isNumeric = (str) => /^\d+$/.test(str);
  const noSpecialChars = (str) => /^[a-zA-Z\s]+$/.test(str);

  const calculateAge = (fecha) => {
    const birthDate = new Date(fecha); // No inviertas el orden
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const errores = [];

    const nombre = formData.nombre.trim();
    const apellido = formData.apellido.trim();
    const cedula = formData.cedula.trim();
    const telefono = formData.telefono.trim();
    const direccion = formData.direccion.trim().toUpperCase();
    const email = formData.email.trim();
    const edad = calculateAge(formData.fecha_nac);

    // Nombre y apellido
    if (!nombre || !noSpecialChars(nombre)) errores.push("Nombre inválido.");
    if (!apellido || !noSpecialChars(apellido)) errores.push("Apellido inválido.");

    // Cédula
    if (!isNumeric(cedula) || cedula.length > 12) errores.push("Cédula inválida.");

    // Edad
    if (edad < 18) errores.push("Debes ser mayor de 18 años.");

    // Teléfono
    if (!isNumeric(telefono) || telefono.length === 9) errores.push("Teléfono inválido.");

    // Dirección
    const siglasValidas = tiposVia.map(via => via.sigla);
    if (!siglasValidas.includes(direccion)) errores.push("Tipo de vía (Dirección) inválido.");

    // Email
    if (!isValidEmail(email)) errores.push("Correo electrónico inválido.");

    // Checkboxes
    if (!formData.a_t_c || !formData.a_p_d) {
      errores.push("Debes aceptar todos los términos y condiciones.");
    }

    console.log(errores, errores.length);

    if (errores.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Errores en el formulario",
        html: errores.join("<br>"),
      });
      return;
    }

    // Si pasa validaciones
    try {

      const dataToSend = {
        authFirebase: false,
        authVtex: false,
        authSiesa: true,
        origen: "sw_web_reg",
        formData: {
          firstName: formData.nombre.trim(),
          lastName: formData.apellido.trim(),
          email: formData.email.trim(),
          phone: formData.telefono.trim(),
          documentType: "", // Si lo tienes
          documentNumber: formData.cedula.trim(),
          password: "",
          birthDate: formData.fecha_nac, // Ya viene como "DD-MM-YYYY" si lo usas así
          address: {
            address: `${formData.direccion.toUpperCase()} ${formData.direccion2} ${formData.direccion3} ${formData.direccion4}`,
            city: formData.ciudad
          }
        }
      };

      console.log(dataToSend);
      console.log(formData);
      const res = await axios.post(API, dataToSend);

      if (res.status == 200) {
         console.log(res)
          Swal.fire({
            title: res.data.message,
            icon: "success",
          });
      } else {
          console.log(res)
          Swal.fire({
            title: "Error contacte al soporte tecnico de krika.",
            icon: "info",
          });
      }

    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error al enviar los datos",
        text: "Ocurrió un problema al enviar el formulario.",
      });
    }
  };

  const ciudadesColombia = [
    "Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena",
    "Bucaramanga", "Pereira", "Santa Marta", "Manizales", "Ibagué",
    "Villavicencio", "Cúcuta", "Neiva", "Popayán", "Armenia",
    "Pasto", "Sincelejo", "Montería", "Tunja", "Valledupar"];

  const tiposVia = [
    { sigla: "AC", nombre: "Avenida calle" },
    { sigla: "AD", nombre: "Administración" },
    { sigla: "ADL", nombre: "Adelante" },
    { sigla: "AER", nombre: "Aeropuerto" },
    { sigla: "AG", nombre: "Agencia" },
    { sigla: "AGP", nombre: "Agrupación" },
    { sigla: "AK", nombre: "Avenida carrera" },
    { sigla: "AL", nombre: "Altillo" },
    { sigla: "ALD", nombre: "Al lado" },
    { sigla: "ALM", nombre: "Almacén" },
    { sigla: "AP", nombre: "Apartamento" },
    { sigla: "APTDO", nombre: "Apartado" },
    { sigla: "ATR", nombre: "Atrás" },
    { sigla: "AUT", nombre: "Autopista" },
    { sigla: "AV", nombre: "Avenida" },
    { sigla: "AVIAL", nombre: "Anillo vial" },
    { sigla: "BG", nombre: "Bodega" },
    { sigla: "BL", nombre: "Bloque" },
    { sigla: "BLV", nombre: "Boulevard" },
    { sigla: "BRR", nombre: "Barrio" },
    { sigla: "C", nombre: "Corregimiento" },
    { sigla: "CA", nombre: "Casa" },
    { sigla: "CAS", nombre: "Caserío" },
    { sigla: "CC", nombre: "Centro comercial" },
    { sigla: "CD", nombre: "Ciudadela" },
    { sigla: "CEL", nombre: "Célula" },
    { sigla: "CEN", nombre: "Centro" },
    { sigla: "CIR", nombre: "Circular" },
    { sigla: "CL", nombre: "Calle" },
    { sigla: "CLJ", nombre: "Callejón" },
    { sigla: "CN", nombre: "Camino" },
    { sigla: "CON", nombre: "Conjunto residencial" },
    { sigla: "CONJ", nombre: "Conjunto" },
    { sigla: "CR", nombre: "Carrera" },
    { sigla: "CRT", nombre: "Carretera" },
    { sigla: "CRV", nombre: "Circunvalar" },
    { sigla: "CS", nombre: "Consultorio" },
    { sigla: "DG", nombre: "Diagonal" },
    { sigla: "DP", nombre: "Depósito" },
    { sigla: "DPTO", nombre: "Departamento" },
    { sigla: "DS", nombre: "Depósito sótano" },
    { sigla: "ED", nombre: "Edificio" },
    { sigla: "EN", nombre: "Entrada" },
    { sigla: "ES", nombre: "Escalera" },
    { sigla: "ESQ", nombre: "Esquina" },
    { sigla: "ESTE", nombre: "Este" },
    { sigla: "ET", nombre: "Etapa" },
    { sigla: "EX", nombre: "Exterior" },
    { sigla: "FCA", nombre: "Finca" },
    { sigla: "GJ", nombre: "Garaje" },
    { sigla: "GS", nombre: "Garaje sótano" },
    { sigla: "GT", nombre: "Glorieta" },
    { sigla: "HC", nombre: "Hacienda" },
    { sigla: "HG", nombre: "Hangar" },
    { sigla: "IN", nombre: "Interior" },
    { sigla: "IP", nombre: "Inspección de Policía" },
    { sigla: "IPD", nombre: "Inspección Departamental" },
    { sigla: "IPM", nombre: "Inspección Municipal" },
    { sigla: "KM", nombre: "Kilómetro" },
    { sigla: "LC", nombre: "Local" },
    { sigla: "LM", nombre: "Local mezzanine" },
    { sigla: "LT", nombre: "Lote" },
    { sigla: "MD", nombre: "Módulo" },
    { sigla: "MJ", nombre: "Mojón" },
    { sigla: "MLL", nombre: "Muelle" },
    { sigla: "MN", nombre: "Mezzanine" },
    { sigla: "MZ", nombre: "Manzana" },
    { sigla: "OF", nombre: "Oficina" },
    { sigla: "PA", nombre: "Parcela" },
    { sigla: "PAR", nombre: "Parque" },
    { sigla: "PD", nombre: "Predio" },
    { sigla: "PH", nombre: "Penthouse" },
    { sigla: "PJ", nombre: "Pasaje" },
    { sigla: "PL", nombre: "Planta" },
    { sigla: "PN", nombre: "Puente" },
    { sigla: "POR", nombre: "Portería" },
    { sigla: "POS", nombre: "Poste" },
    { sigla: "PQ", nombre: "Parqueadero" },
    { sigla: "PRJ", nombre: "Paraje" },
    { sigla: "PS", nombre: "Paseo" },
    { sigla: "PT", nombre: "Puesto" },
    { sigla: "PW", nombre: "Park Way" },
    { sigla: "RP", nombre: "Round Point" },
    { sigla: "SA", nombre: "Salón" },
    { sigla: "SC", nombre: "Salón comunal" },
    { sigla: "SD", nombre: "Salida" },
    { sigla: "SEC", nombre: "Sector" },
    { sigla: "SL", nombre: "Solar" },
    { sigla: "SM", nombre: "Súper manzana" },
    { sigla: "SS", nombre: "Semisótano" },
    { sigla: "ST", nombre: "Sótano" },
    { sigla: "SUITE", nombre: "Suite" },
    { sigla: "SUR", nombre: "Sur" },
    { sigla: "TER", nombre: "Terminal" },
    { sigla: "TERPLN", nombre: "Terraplén" },
    { sigla: "TO", nombre: "Torre" },
    { sigla: "TV", nombre: "Transversal" },
    { sigla: "TZ", nombre: "Terraza" },
    { sigla: "UN", nombre: "Unidad" },
    { sigla: "UR", nombre: "Unidad residencial" },
    { sigla: "URB", nombre: "Urbanización" },
    { sigla: "VRD", nombre: "Vereda" },
    { sigla: "VTE", nombre: "Variante" },
    { sigla: "ZF", nombre: "Zona franca" },
    { sigla: "ZN", nombre: "Zona" }
  ];


  const handleSize = (s) => {
    if (s >= 600) {
      return 'col-3'
    } else {
      return 'col-6';
    }
  }

  return (
    <div className="container-fluid p-0" >
      <div className="d-flex si-hi">
        <div className="p-2 flex-grow-1 bg-custon">

        </div>

        <div className="p-8 flex-fill boxCuston">
          <div className="w-90 toper">

            <div className="text-center">
              <div className="row justify-content-between">
                <div className="col-4">
                  <img className="logo" src="https://krika.vtexassets.com/assets/vtex.file-manager-graphql/images/a93fbd68-2deb-40ea-833f-a78df15ad269___be3cb4d2ccfa326ed19d131ec2d6e475.png" />
                </div>

                <div className="col-4">
                  <a class="btn btn-shop" target="_blank" href="https://www.krika.co/" role="button">Tienda <i class="bi bi-shop"></i></a>
                </div>
              </div>
            </div>

            <div className="banner-movil">
              <img className="Banner" src="http://localhost:8080/wp-content/uploads/2025/05/banner-landing_mobile.png" />
            </div>


            <h4 className="mb-4 text-center mb-3 title">¡Regístrate ahora!</h4>

            <form onSubmit={handleSubmit} className="d-flex flex-wrap justify-content-between">
              <div className="col-6">
                <div className="form-floating">
                  <input type="text" name="nombre" className="form-control ipCus" id="nombre" placeholder="Nombre" onChange={handleChange} required />
                  <label htmlFor="nombre">Nombre</label>
                </div>
              </div>

              <div className="col-6">
                <div className="form-floating">
                  <input type="text" name="apellido" className="form-control ipCus" id="apellido" placeholder="Apellido" onChange={handleChange} required />
                  <label htmlFor="apellido">Apellido</label>
                </div>
              </div>

              <div className="col-6">
                <div className="form-floating">
                  <input type="number" name="cedula" className="form-control ipCus" min={0} maxLength={12} id="cedula" placeholder="Cédula" onChange={handleChange} required />
                  <label htmlFor="cedula">Cédula</label>
                </div>
              </div>

              <div className="col-6">
                <div className="form-floating">
                  <input
                    type="text"
                    name="fecha_nac"
                    className="form-control ipCus"
                    ref={dateInputRef}
                    placeholder="Selecciona una fecha"

                  />
                  <label htmlFor="form-label">Fecha de Nacimiento</label>
                </div>
              </div>

              <div className="col-6">
                <div className="form-floating">
                  <input type="number" name="telefono" className="form-control ipCus" min={0} maxLength={10} id="cedula" placeholder="Cédula" onChange={handleChange} required />
                  <label htmlFor="cedula">Teléfono</label>
                </div>
              </div>

              <div className="col-6">
                <div className="form-floating">
                  <input type="text" className="form-control ipCus" id="ciudad" name="ciudad" list="datalistOptions" placeholder="Ciudad" value={formData.ciudad} onChange={handleChange} required />
                  <datalist id="datalistOptions">
                    {ciudadesColombia.map((ciudad, index) => (
                      <option key={index} value={ciudad} />
                    ))}
                  </datalist>
                  <label htmlFor="ciudad">Ciudad</label>
                </div>
              </div>

              <div className={handleSize(screenWidth)}>
                <div className="form-floating">
                  <input
                    className="form-control ipCus" list="tiposViaList" id="tipoViaInput" name="direccion" placeholder="Selecciona tipo de vía" value={formData.direccion} onChange={(e) => {
                      const selected = tiposVia.find(op => op.nombre === e.target.value);
                      setFormData({ ...formData, direccion: selected ? selected.sigla : e.target.value });
                    }}

                  />
                  <datalist id="tiposViaList">
                    {tiposVia.map((tipo, idx) => (
                      <option key={idx} value={tipo.nombre} />
                    ))}
                  </datalist>
                  <label htmlFor="tipoViaInput">Tipo de vía</label>
                </div>
              </div>

              <div className={handleSize(screenWidth)}>
                <div className="form-floating">
                  <input type="number" name="direccion2" className="form-control ipCus" min={0} maxLength={12} id="direccion2" placeholder="direccion2" onChange={handleChange} required />
                  <label htmlFor="cedula">Número principal</label>
                </div>
              </div>

              <div className={handleSize(screenWidth)}>
                <div className="form-floating">
                  <input type="number" name="direccion3" className="form-control ipCus" min={0} maxLength={12} id="direccion3" placeholder="direccion3" onChange={handleChange} required />
                  <label htmlFor="direccion3">Número secundario</label>
                </div>
              </div>

              <div className={handleSize(screenWidth)}>
                <div className="form-floating">
                  <input type="number" name="direccion4" className="form-control ipCus" min={0} maxLength={12} id="direccion4" placeholder="direccion4" onChange={handleChange} required />
                  <label htmlFor="direccion4">Número terciario</label>
                </div>
              </div>

              <div className="col-12">
                <div className="form-floating">
                  <input type="email" name="email" className="form-control ipCus" id="email" placeholder="@" onChange={handleChange} required />
                  <label htmlFor="cedula">Correo</label>
                </div>
              </div>
              <br /><br /><br />
              <div className="col-12">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="checkDefault" name="a_t_c" onChange={handleChange} required />
                  <label class="form-check-label" for="checkDefault">
                    Aceptar términos y condiciones
                  </label>
                </div>
              </div>

              <div className="col-12">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="checkDefault" name="a_p_d" onChange={handleChange} required />
                  <label class="form-check-label" for="checkDefault">
                    Aceptar política y privacidad de datos
                  </label>
                </div>
              </div>

              <div className="col-12">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="checkDefault" name="newle" onChange={handleChange} />
                  <label class="form-check-label" for="checkDefault">
                    Quiero recibir el newsletter con promociones
                  </label>
                </div>
              </div>
              <br /><br /><br />
              <div className="col-12">
                <button type="submit" className="btn btn-primary btn-k">Enviar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const root = document.getElementById('reg-krika-root');
ReactDOM.render(<Formulario />, root);
