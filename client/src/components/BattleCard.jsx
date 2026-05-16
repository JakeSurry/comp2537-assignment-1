function BattleCard({ name, level, currentHp, maxHp }) {
  const hpColor =
    currentHp > 0.5 * maxHp
      ? "bg-green-500"
      : currentHp > 0.2 * maxHp
        ? "bg-yellow-500"
        : "bg-red-500";
  return (
    <div className="bg-surface border-2 border-muted rounded-xl px-4 py-3 w-64">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-200 font-bold">{name}</span>
        <span className="text-gray-500 text-sm">Lv {level}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-gray-500 text-xs">HP</span>
        <div className="flex-1 h-2 bg-gray-700 rounded-full">
          <div
            className={`h-full rounded-full transition-all duration-300 ${hpColor}`}
            style={{ width: `${(currentHp / maxHp) * 100}%` }}
          />
        </div>
      </div>
      <p className="text-gray-500 text-xs text-right mt-1">
        {currentHp} / {maxHp}
      </p>
    </div>
  );
}

export default BattleCard;
