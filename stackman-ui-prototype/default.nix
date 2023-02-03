{ lib, stdenvNoCC }:

stdenvNoCC.mkDerivation {
  pname = "stackman-ui-prototype";
  version = "0.1.0";

  src = ./.;

  installPhase = ''
    mkdir -p "$out"

    cp index.html "$out"
    cp sw.js "$out"
  '';

  meta = {
    description = "Prototype web interface for Stackman";
    homepage = "https://github.com/wuvt/stackman";
    license = lib.licenses.agpl3Plus;
    platforms = lib.platforms.linux;
  };
}
