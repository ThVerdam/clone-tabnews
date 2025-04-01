import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

const styles = {
  container: {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
  title: {
    fontWeight: 700,
    fontSize: "2rem",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
};

export default function StatusPage() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Status</h2>
        <UpdatedAt />
        <DatabaseStatus />
      </div>
    </div>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <p>Última atualização: {updatedAtText}</p>;
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let databaseStatusInformation = "Carregando...";

  if (!isLoading && data) {
    databaseStatusInformation = (
      <>
        <p>Versão: {data.dependencies.database.version}</p>
        <p>Conexões abertas: {data.dependencies.database.opened_connections}</p>
        <p>Conexões Máximas: {data.dependencies.database.max_connections}</p>
      </>
    );
  }

  return (
    <>
      <div style={styles.card}>
        <h2 style={styles.title}>Database</h2>
        <div>{databaseStatusInformation}</div>
      </div>
    </>
  );
}
