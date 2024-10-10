<?php

namespace App\Controller;

use App\Entity\Socio;
use App\Repository\SocioRepository;
use App\Repository\EmpresaRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/socio')]
class SocioController extends AbstractController
{
    private $entityManager;
    private $socioRepository;
    private $empresaRepository;

    public function __construct(EntityManagerInterface $entityManager, SocioRepository $socioRepository, EmpresaRepository $empresaRepository)
    {
        $this->entityManager = $entityManager;
        $this->socioRepository = $socioRepository;
        $this->empresaRepository = $empresaRepository;
    }

    #[Route('/', methods: ['GET'])]
    public function index(): Response
    {
        $socios = $this->socioRepository->findAll();
        $data = array_map(function ($socio) {
            return [
                'id' => $socio->getId(),
                'nome' => $socio->getNome(),
                'empresa_id' => $socio->getEmpresa() ? $socio->getEmpresa()->getId() : null,
            ];
        }, $socios);

        return $this->json($data);
    }

    #[Route('/{id}', methods: ['GET'])]
    public function show(int $id): Response
    {
        $socio = $this->socioRepository->find($id);

        if (!$socio) {
            return $this->json(['message' => 'Sócio não encontrado'], Response::HTTP_NOT_FOUND);
        }

        $data = [
            'id' => $socio->getId(),
            'nome' => $socio->getNome(),
            'empresa_id' => $socio->getEmpresa()->getId(),
        ];

        return $this->json($data);
    }

    #[Route('/', methods: ['POST'])]
    public function create(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $empresa = $this->empresaRepository->find($data['empresa_id']);

        if (!$empresa) {
            return $this->json(['message' => 'Empresa não encontrada'], Response::HTTP_NOT_FOUND);
        }

        $socio = new Socio();
        $socio->setNome($data['nome']);
        $socio->setEmpresa($empresa);

        $this->entityManager->persist($socio);
        $this->entityManager->flush();

        return $this->json([
            'id' => $socio->getId(),
            'nome' => $socio->getNome(),
            'empresa_id' => $empresa->getId(),
        ], Response::HTTP_CREATED);
    }

    #[Route('/{id}', methods: ['PUT'])]
    public function update(Request $request, int $id): Response
    {
        $socio = $this->socioRepository->find($id);
        if (!$socio) {
            return $this->json(['message' => 'Sócio não encontrado'], Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);
        $empresa = $this->empresaRepository->find($data['empresa_id']);

        if (!$empresa) {
            return $this->json(['message' => 'Empresa não encontrada'], Response::HTTP_NOT_FOUND);
        }

        $socio->setNome($data['nome']);
        $socio->setEmpresa($empresa);

        $this->entityManager->flush();

        return $this->json([
            'id' => $socio->getId(),
            'nome' => $socio->getNome(),
            'empresa_id' => $empresa->getId(),
        ]);
    }

    #[Route('/{id}', methods: ['DELETE'])]
    public function delete(int $id): Response
    {
        $socio = $this->socioRepository->find($id);
        if (!$socio) {
            return $this->json(['message' => 'Sócio não encontrado'], Response::HTTP_NOT_FOUND);
        }

        $this->entityManager->remove($socio);
        $this->entityManager->flush();

        return $this->json(['message' => 'Sócio removido com sucesso']);
    }
}
