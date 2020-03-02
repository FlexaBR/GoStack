import Avatar from '../models/Avatar';

class AvatarController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const avatar = await Avatar.create({
      name,
      path,
    });

    return res.json(avatar);
  }

  async update(req, res) {
    const { originalname: name, filename: path } = req.file;

    const avatar = await Avatar.findByPk(req.params.id);

    await avatar.update({
      name,
      path,
    });

    return res.json(avatar);
  }
}

export default new AvatarController();
