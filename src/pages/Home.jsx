import React from "react";
import img1 from "../assets/carne-ahumada.jpg";
import img2 from "../assets/paella2.jpg";
import img3 from "../assets/paella1.jpg";
import img4 from "../assets/marta.jpg";

import "bootstrap/dist/js/bootstrap.bundle.min.js";

const home = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center mt-3">
          <h1 className="fw-semibold">BIENVENIDOS A LA GOLETA</h1>
          <p className="fade-in">
            Explora la reconocida cocina de La Goleta, un restaurante de
            renombre en Oliva que ganó el concurso de Arroz a Banda de Denia en
            el año 2000. Nos destacamos por ofrecer una experiencia culinaria
            innovadora y única. En La Goleta, nos enorgullecemos de nuestra
            cocina sostenible, utilizando ingredientes de alta calidad para
            satisfacer a nuestros comensales.
          </p>
        </div>
        <div className="col-4 px-0"></div>
        <div className="col-4 px-0">
            <div className="">
              <div id="carouselExample" class="carousel slide">
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img src={img2} class="d-block rotar" alt="Carne Ahumada" />
                  </div>
                  <div class="carousel-item">
                    <img src={img2} class="d-block rotar" alt="Paella 2" />
                  </div>
                  <div class="carousel-item">
                    <img src={img2} class="d-block rotar" alt="Paella 1" />
                  </div>
                </div>
                <button
                  class="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExample"
                  data-bs-slide="prev"
                >
                  <span
                    class="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button
                  class="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExample"
                  data-bs-slide="next"
                >
                  <span
                    class="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
            </div>
        </div>
        <div className="col-4 px-0"></div>
        <div className="col-12 col-md-2 text-center mt-5 align-items-center align-content-center">
          <p className="fs-4 fw-bold">VEN A COMER</p>
          <p>Carrer de la Mar Mediterrània, 7, 46780 Oliva, Valencia</p>
          <p>625 48 04 38</p>
        </div>
        <div className="col-12 col-md-2 text-center mt-5 align-content-center">
          <p className="fs-4 fw-bold">HORARIO</p>
          <p>
            De lunes a domingo* 9:00h a 00:00h * Martes: cerrado por descanso
            del personal Cocina de 9:00h a 23:00h
          </p>
        </div>
        <div className="col-12 col-md-2 text-center mt-5 align-content-center">
          <p className="fs-4 fw-bold">PIDE TU ARROZ</p>
          <p>Para pedir tu arroz, reservalo antes de las 12:30h</p>
        </div>
        <div className="col-12 col-md-5 mt-5">
          <img src={img4} className="img-fluid rounded" alt="..."></img>
        </div>
      </div>
    </div>
  );
};

export default home;
