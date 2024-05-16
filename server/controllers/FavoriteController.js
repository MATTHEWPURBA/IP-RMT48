class FavoriteController {
  static async addtoFavorite(req, res, next) {
    try {
      const { voucherId } = req.params;
      const { message, amount, receiverId } = req.body;
      const senderId = req.user.id;
      if (!receiverId) {
        return res.status(400).json({ message: "ReceiverId is required" });
      }
      const gift = await Gift.create({
        message: message,
        amount: amount,
        receiverId: receiverId,
        senderId: senderId,
        voucherId: +voucherId,
        status: "unclaimed",
      });

      res.status(201).json(gift);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = FavoriteController;
