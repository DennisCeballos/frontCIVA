export interface BusItem {
    id: number;
    nro_bus?: number;
    placa?: string;
    fecha_creacion?: string;
    caracteristicas?: string;
    marca_bus?: string;
    estado?: boolean;
  }
  
  export const fetchData = async (): Promise<BusItem[]> => {
    const response = await fetch('/bus');
    if (!response.ok) throw new Error('Fallo al recibir data');
    return response.json();
  };
  