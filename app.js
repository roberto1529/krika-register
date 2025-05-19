const { useState, useRef, useEffect } = React;

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

  useEffect(() => {
    if (dateInputRef.current && window.flatpickr) {
      window.flatpickr(dateInputRef.current, {
        dateFormat: "d-m-Y",
        onChange: (selectedDates, dateStr) => {
          setFormData(prev => ({ ...prev, fecha_nac: dateStr }));
        }
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      alert('Datos enviados correctamente');
    } catch (error) {
      console.error(error);
      alert('Error al enviar los datos');
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

  const nl = 'Num/Let'


  return (
    <div className="container-fluid">
      <div className="row" style={{ minHeight: '100vh' }}>
        <div className="col-8 bg-custon"></div>

        <div className="boxCuston col-4">
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


            <h4 className="mb-4 text-center mb-3 title">¡Regístrate ahora!</h4>

            <form onSubmit={handleSubmit} className="row g-3">
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
                  <input type="number" name="cedula" className="form-control ipCus" min={0} maxLength={10} id="cedula" placeholder="Cédula" onChange={handleChange} required />
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
                    required
                  />
                  <label htmlFor="form-label">Fecha de Nacimiento</label>
                </div>
              </div>

              <div className="col-6">
                <div className="form-floating">
                  <input type="number" name="telefono" className="form-control ipCus" min={0} maxLength={12} id="cedula" placeholder="Cédula" onChange={handleChange} required />
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

              <div className="col-3">
                <div className="form-floating">
                  <input
                    className="form-control ipCus" list="tiposViaList" id="tipoViaInput" name="direccion" placeholder="Selecciona tipo de vía" value={formData.direccion} onChange={(e) => {
                      const selected = tiposVia.find(op => op.nombre === e.target.value);
                      setFormData({ ...formData, direccion: selected ? selected.sigla : e.target.value });
                    }}
                    required
                  />
                  <datalist id="tiposViaList">
                    {tiposVia.map((tipo, idx) => (
                      <option key={idx} value={tipo.nombre} />
                    ))}
                  </datalist>
                  <label htmlFor="tipoViaInput">Dirección</label>
                </div>
              </div>

              <div className="col-3">
                <div className="form-floating">
                  <input type="number" name="telefono" className="form-control ipCus" min={0} maxLength={12} id="direccion2" placeholder="direccion2" onChange={handleChange} required />
                  <label htmlFor="cedula">{nl}</label>
                </div>
              </div>

              <div className="col-3">
                <div className="form-floating">
                  <input type="number" name="telefono" className="form-control ipCus" min={0} maxLength={12} id="direccion3" placeholder="direccion3" onChange={handleChange} required />
                  <label htmlFor="cedula">{nl}</label>
                </div>
              </div>

              <div className="col-3">
                <div className="form-floating">
                  <input type="number" name="telefono" className="form-control ipCus" min={0} maxLength={12} id="direccion4" placeholder="direccion4" onChange={handleChange} required />
                  <label htmlFor="cedula">{nl}</label>
                </div>
              </div>

              <div className="col-12">
                <div className="form-floating">
                  <input type="email" name="email" className="form-control ipCus" min={0} maxLength={12} id="email" placeholder="@" onChange={handleChange} required />
                  <label htmlFor="cedula">Correo</label>
                </div>
              </div>

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
                  <input class="form-check-input" type="checkbox" value="" id="checkDefault" name="newle" onChange={handleChange} required />
                  <label class="form-check-label" for="checkDefault">
                    Quiero recibir el newsletter con promociones
                  </label>
                </div>
              </div>

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
