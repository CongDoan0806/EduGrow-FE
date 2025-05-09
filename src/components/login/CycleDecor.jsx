export default function CycleDecor() {
    return (
      <>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} className={`cycle-decor cycle-decor-${i} rounded-circle`} />
        ))}
      </>
    );
  }
  