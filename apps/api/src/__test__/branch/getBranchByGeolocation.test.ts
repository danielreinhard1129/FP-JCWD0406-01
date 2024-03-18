import { getBranchByGeolocationAction } from '@/actions/branch/getBranchByGeolocation.action';
import { getBranchs } from '@/repositories/branchs/getBranchs';

jest.mock('@/repositories/branchs/getBranchs', () => ({
  getBranchs: jest.fn(),
}));

describe('getBranchByGeolocationAction', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the nearest branch information', async () => {
    const mockBranches = [
      { latitude: 10, longitude: 20 },
      { latitude: 15, longitude: 25 },
    ];

    const mockUserCoordinates = { latitude: 12, longitude: 22 };

    (getBranchs as jest.Mock).mockResolvedValueOnce(mockBranches);

    const result = await getBranchByGeolocationAction(mockUserCoordinates);

    expect(result.message).toBe('get branchs by Geolocation success');
    expect(result.status).toBe(200);

    expect(getBranchs).toHaveBeenCalledWith();
  });

  it('should throw an error if getBranchs fails', async () => {
    (getBranchs as jest.Mock).mockRejectedValueOnce(new Error('Mocked error'));

    await expect(
      getBranchByGeolocationAction({ latitude: 12, longitude: 22 }),
    ).rejects.toThrow('Mocked error');
  });
});
