{ lib, buildNpmPackage }:

buildNpmPackage {
  pname = "stackman-ui";
  version = "0.0.1";

  src = ./.;

  npmDepsHash = "sha256-hE2Co9aHo561sM4xQxnvmvQfSKf4l9tJgbji4tKlV/Y=";

  meta = {
    description = "Web interface for browsing and playing from Stackman";
    homepage = "https://github.com/wuvt/stackman";
    license = lib.licenses.agpl3Plus;
    platforms = lib.platforms.linux;
  };
}
