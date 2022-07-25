/**
 * Declare the scss module to use into the components
 */
declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

/**
 * Declare the svg file to load into de components
 */
declare module "*.svg" {
  const content: any;
  export default content;
}


/**
 * Declare the png file to load into de components
 */
declare module "*.png" {
  const content: any;
  export default content;
}
