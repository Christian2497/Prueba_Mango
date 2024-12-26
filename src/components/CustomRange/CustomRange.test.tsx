import { render, screen, waitFor } from '@testing-library/react';
import Exercise2 from '../../app/exercise2/page'; // Asegúrate de que la ruta sea correcta
import { fetchMockRangeValues2 } from '@/utils/api';

// Mock de la función fetchMockRangeValues2
jest.mock('@/utils/api', () => ({
    fetchMockRangeValues2: jest.fn(),
}));

describe('Exercise2 Component', () => {
    it('should display loading initially', () => {
        render(<Exercise2 />);

        // Verificar que el texto "Loading..." se muestra inicialmente
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it('should display range values after data is fetched', async () => {
        // Simula una respuesta exitosa de la API
        (fetchMockRangeValues2 as jest.Mock).mockResolvedValueOnce({
            rangeValues: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99],
        });

        render(<Exercise2 />);

        // Esperar a que los valores del rango se hayan cargado
        await waitFor(() => expect(fetchMockRangeValues2).toHaveBeenCalledTimes(1));

        // Verificar que los valores del rango se muestran
        const rangeValue = screen.getByText('$1.99');
        expect(rangeValue).toBeInTheDocument();

        // Verificar que todos los valores del rango se muestran
        const rangeLabels = screen.getAllByText(/\$\d+\.\d+/);
        expect(rangeLabels.length).toBe(6); // Asegúrate de que todos los valores estén presentes
    });

    it('should call fetchMockRangeValues2 and handle errors', async () => {
        // Simula una respuesta de error
        (fetchMockRangeValues2 as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch'));

        render(<Exercise2 />);

        // Espera que los valores no se muestren debido al error
        await waitFor(() => expect(fetchMockRangeValues2).toHaveBeenCalledTimes(1));

        // Verifica que el componente siga mostrando "Loading..." si hay un error
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });
});
