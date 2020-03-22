export const convert = (originalLog: string) => {
  return originalLog
    .replace(/raises (\d+) to (\d+)/g, "raises $$$1 to $$$2")
    .replace(/calls (\d+)/g, "calls $$$1")
    .replace(/bets (\d+)/g, "bets $$$1")
    .replace(/Hold'em (No |Pot )?Limit \((\d+)\/(\d+)\)/g, "Hold'em $1Limit ($$$2/$$$3)")
    .replace(/collected (\d+)/g, "collected $$$1")
    .replace(/collected \((\d+)\)/g, "collected ($$$1)")
    .replace(/and won \((\d+)\) /g, "and won ($$$1) ")
    .replace(/bet \((\d+)\) returned/g, "bet ($$$1) returned")
    .replace(/posts small blind (\d+)/g, "posts small blind $$$1")
    .replace(/posts big blind (\d+)/g, "posts big blind $$$1")
    .replace(/\((\d+) in chips\)/g, "($$$1 in chips)")
    .replace(/Total pot (\d+) \| Rake (\d+)/g, "Total pot $$$1 | Rake $$$2")
}

export const download = ({ filename, text }: { filename: string, text: string }) => {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
