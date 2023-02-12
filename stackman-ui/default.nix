{ lib, buildNpmPackage }:

buildNpmPackage {
  pname = "stackman-ui";
  version = "0.0.1";

  src = ./.;

  npmDepsHash = "sha256-PwYJgBHrze+n9vBRs/EFGQLyQrfoOmL/51k4H2W1ZIo=";

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
