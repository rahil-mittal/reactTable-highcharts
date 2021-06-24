const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  return {
    progress: makeHighchartData()
  };
};

export default function data(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d) => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
      };
    });
  };

  return makeDataLevel();
}

function makeHighchartData() {
  let highchartsData = {
    chart: {
      type: "bar"
    },
    title: {
      text: "Randomly generated highchart"
    },
    xAxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May"]
    },
    legend: {
      enabled: true
    },
    series: []
  };

  for (let i = 0; i < 2; i++) {
    let seriesData = {
      data: [
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100)
      ]
    };
    highchartsData.series.push(seriesData);
  }

  return highchartsData;
}
