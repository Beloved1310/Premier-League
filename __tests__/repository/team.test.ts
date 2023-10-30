import Team, { ITeam }  from '../../api/model/team';
// import { ITeam } from '../../api/model/team';
import { teamRepository } from '../../api/repositories/team';

jest.mock('../../api/model/team', () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  updateOne: jest.fn(),
  deleteOne: jest.fn(),
  find: jest.fn(),
  countDocuments: jest.fn(),
}));

describe('teamRepository', () => {
  const sampleTeam = {
    name: 'Super Facolnss',
    country: 'Nigeria',
    founded: 1994,
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

//   it('getOneTeam should return a team', async () => {
//     (Team.findOne as jest.Mock).mockResolvedValue(sampleTeam);
//     const result = await teamRepository.getOneTeam({name : sampleTeam.name});
//     expect(result).toEqual(sampleTeam);
//   });

//   it('createTeam should create and return a team', async () => {
//     (Team.create as jest.Mock).mockResolvedValue(sampleTeam);
//     const result = await teamRepository.createTeam(sampleTeam);
//     expect(result).toEqual(sampleTeam);
//   });


  it('updateTeam should update a team', async () => {
    (Team.updateOne as jest.Mock).mockResolvedValue({ nModified: 1 });
    const result = await teamRepository.updateTeam('sampleCode', {});
    expect(result).toEqual({ nModified: 1 });
  });

  it('deleteTeam should delete a team', async () => {
    (Team.deleteOne as jest.Mock).mockResolvedValue({ deletedCount: 1 });
    const result = await teamRepository.deleteTeam('sampleCode');
    expect(result).toEqual({ deletedCount: 1 });
  });
});
