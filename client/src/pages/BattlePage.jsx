import BattleCard from "../components/BattleCard";

const BattlePage = () => {
  return (
    <div>
      <BattleCard name="Charizard" level={50} currentHp={100} maxHp={150} />
    </div>
  );
};
export default BattlePage;
