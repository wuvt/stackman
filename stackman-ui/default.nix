{ lib, buildNpmPackage }:

buildNpmPackage {
  pname = "stackman-ui";
  version = "0.0.1";

  src = ./.;

  npmDepsHash = "sha256-WLeU6n3LK5sIZX1MrQFgHACqDRzXNtf8D5ANd50/OY8=";

  installPhase = ''
    mkdir -p "$out"
    cp -r dist/* "$out"
  '';

  meta = {
    description = "Web interface for browsing and playing from Stackman";
    homepage = "https://github.com/wuvt/stackman";
    license = lib.licenses.agpl3Plus;
    platforms = lib.platforms.linux;
  };
}
