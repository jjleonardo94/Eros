import React from "react";
import "../../assets/invoice.css";
import Logo from "../../images/tropigasLogo.png";

const invoice = () => {
  return (
    <div className="main">
      <div className="top">
        <div className="logo">
          <img src={Logo} alt="" width="140" height="65" />
        </div>
        <div className="fichaCamion">
          <div id="fichaCamionTable">
            <div className="fichaCamionRow">
              <div className="fichaCamionCell">
                <b>FICHA DEL CAMIÓN</b>
              </div>
            </div>
            <div className="fichaCamionRow">
              <div className="fichaCamionCell2">RG-39</div>
            </div>
          </div>
        </div>
      </div>
      <div id="header">
        <div id="headerTable">
          <div className="headerRow">
            <div className="headerCell">
              <b>No. VENTA ANTERIOR</b>
            </div>
            <div className="headerCell">
              <b>CÓDIGO</b>
            </div>
            <div className="headerCell">
              <b>LECTURA FINAL</b>
            </div>
          </div>
          <div className="headerRow">
            <div className="headerCell2">D206</div>
            <div className="headerCell2"></div>
            <div className="headerCell2">86%</div>
          </div>
          <div className="headerRow">
            <div className="headerCell3">
              <b>SU NUM. DE VENTA</b>
            </div>
            <div className="headerCell3"></div>
            <div className="headerCell3">
              <b>LECTURA FINAL</b>
            </div>
          </div>
        </div>
      </div>
      <div >
        <div >
          <div >
            <div className="paymentCell">
              <div>
                <b>1 - CONTADO </b>
              </div>
              <input type="checkbox" className="paymentInputContado" />
              <div>
                <b>2 - CRÉDITO </b>
              </div>
              <input type="checkbox" className="paymentInputCredito" />
            </div>
          </div>
        
        </div>
      </div>
        <div >
            <div className="paymentCell2">
              <div>               
                <b>CLIENTE: <span>Juan eonardo Amparo</span></b>       
  
                
              </div>
              <div>                
                  <b>FECHA:</b>
                  <span>09/08/2022</span>                
              </div>
            </div>
          </div>
      <div id="capability">
        <div id="capabilityTable">
          <div className="capabilityRow">
            <div className="capabilityCell">
              <div className="capabilityTextTank">
                <b>CAPACIDAD DEL TANQUE</b>
              
              {/* <input
                type="text"
                name="text"
                className="capabilityInputCapTank"
                placeholder="178,620"
                
              /> */}
              <span> 178,620</span>
              </div>
            </div>
            <div className="capabilityCell">
              <div className="capabilityTextVol1">
                <div className="capabilityTextVolStart">
                  <b>VOLUMEN INICIAL:</b>
                </div>
                <input
                  type="text"
                  name="text"
                  className="capabilityInputVol1"
                  placeholder="-"
                />
                <div className="capabilityTextGLS1">
                  <b>GLS.</b>
                </div>
              </div>
              <div className="capabilityTextVol2">
                <div className="capabilityTextVolFin">
                  <b>VOLUMEN FINAL:</b>
                </div>
                <input
                  type="text"
                  name="text"
                  className="capabilityInputVol2"
                  placeholder="-"
                />
                <div className="capabilityTextGLS2">
                  <b>GLS.</b>
                </div>
              </div>
            </div>
          </div>
        </div>
 
      </div>
      <div id="types">
        <div id="typesTable">
          <div className="typesRow">
            <div className="typesCell">
              <b>TROPIGAS</b>
            </div>
            <div className="typesCell"></div>
            <div className="typesCell"></div>
            <div className="typesCell">
              <b>GALONES</b>
            </div>
            <div className="typesCell">
              <b>PRECIO</b>
            </div>
            <div className="typesCell">
              <b>VALOR</b>
            </div>
          </div>
          <div className="typesRow">
            <div className="typesCell2"></div>
            <div className="typesCell2"></div>
            <div className="typesCell2"></div>
            <div className="typesCell2"></div>
            <div className="typesCell2"></div>
            <div className="typesCell2"></div>
          </div>
          <div className="typesRow">
            <div className="typesCell3">LB</div>
            <div className="typesCell3">INICIO</div>
            <div className="typesCell3">25.5</div>
            <div className="typesCell3">659</div>
            <div className="typesCell3"></div>
            <div className="typesCell3"></div>
          </div>
          <div className="typesRow">
            <div className="typesCell4"></div>
            <div className="typesCell42"> EQUIPOS Y FLETES </div>
            <div className="typesCell4"></div>
            <div className="typesCell4"></div>
            <div className="typesCell4"></div>
            <div className="typesCell4"></div>
          </div>
          <div className="typesRow">
            <div className="typesCell5"></div>
            <div className="typesCell5">CARGA</div>
            <div className="typesCell5">60.5</div>
            <div className="typesCell5">1,851</div>
            <div className="typesCell5"></div>
            <div className="typesCell5"></div>
          </div>
          <div className="typesRow">
            <div className="typesCell6"></div>
            <div className="typesCell6">TOTAL</div>
            <div className="typesCell6">86</div>
            <div className="typesCell6">2,510</div>
            <div className="typesCell6"></div>
            <div className="typesCell6"></div>
          </div>
        </div>
      </div>
      <div className="signature">
        <div className="driverSignature">
          <b className="driverSignatureText">FIRMA CHOFER</b>
          <hr className="signatureLine1" />
        </div>
        <div className="receivedBy">
          <b className="driverSignatureClient">RECIBIDO CONFORME</b>
          <hr className="signatureLine2" />
          <b className="driverSignatureClientText">CLIENTE</b>
        </div>
      </div>
    </div>
  );
};

export default invoice;
